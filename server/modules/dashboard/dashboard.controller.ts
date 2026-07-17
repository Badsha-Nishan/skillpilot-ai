/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Request, Response } from "express";
import mongoose from "mongoose";
import asyncHandler from "../../utils/asyncHandler";
import { LearningPathModel } from "../learningPath/learningPath.model";
import { LearningPathService } from "../learningPath/learningPath.service";

export class DashboardController {
  /**
   * Get dashboard analytical statistics
   * GET /api/dashboard/stats
   */
  static getStats = asyncHandler(async (req: Request, res: Response) => {
    const isDbConnected = mongoose.connection.readyState === 1;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (isDbConnected) {
      console.log("📊 Database online. Executing MongoDB Aggregation Pipeline for dashboard stats...");
      const statsResult = await LearningPathModel.aggregate([
        {
          $facet: {
            total: [{ $count: "count" }],
            byLevel: [
              { $group: { _id: "$level", count: { $sum: 1 } } }
            ],
            byCategory: [
              { $group: { _id: "$category", count: { $sum: 1 } } }
            ],
            byMonth: [
              {
                $group: {
                  _id: {
                    year: { $year: "$createdAt" },
                    month: { $month: "$createdAt" }
                  },
                  count: { $sum: 1 }
                }
              },
              { $sort: { "_id.year": 1, "_id.month": 1 } }
            ]
          }
        }
      ]);

      const facetResult = statsResult[0] || {};
      const totalPaths = facetResult.total?.[0]?.count || 0;

      const levels = facetResult.byLevel || [];
      const beginnerCount = levels.find((l: any) => l._id === "Beginner")?.count || 0;
      const intermediateCount = levels.find((l: any) => l._id === "Intermediate")?.count || 0;
      const advancedCount = levels.find((l: any) => l._id === "Advanced")?.count || 0;

      const categoryStats = (facetResult.byCategory || []).map((c: any) => ({
        category: c._id || "Uncategorized",
        count: c.count
      }));

      const monthlyStats = (facetResult.byMonth || []).map((m: any) => {
        const y = m._id.year;
        const mo = m._id.month - 1; // MongoDB month is 1-indexed (1-12)
        const label = `${monthNames[mo] || "Jan"} ${y}`;
        return {
          month: label,
          count: m.count
        };
      });

      res.status(200).json({
        status: "success",
        data: {
          totalPaths,
          beginnerCount,
          intermediateCount,
          advancedCount,
          categoryStats,
          monthlyStats
        }
      });
    } else {
      console.warn("⚠️ Database offline. Aggregating in-memory stats fallback...");
      const result = await LearningPathService.findAll({ limit: 1000 });
      const paths = result.paths || [];

      const totalPaths = paths.length;
      const beginnerCount = paths.filter((p) => p.level === "Beginner").length;
      const intermediateCount = paths.filter((p) => p.level === "Intermediate").length;
      const advancedCount = paths.filter((p) => p.level === "Advanced").length;

      // Category breakdown
      const categoryMap: Record<string, number> = {};
      paths.forEach((p) => {
        const cat = p.category || "Uncategorized";
        categoryMap[cat] = (categoryMap[cat] || 0) + 1;
      });
      const categoryStats = Object.keys(categoryMap).map((cat) => ({
        category: cat,
        count: categoryMap[cat]
      }));

      // Monthly chronological breakdown
      const monthlyMap: Record<string, { label: string; count: number; sortKey: string }> = {};
      paths.forEach((p) => {
        const date = p.createdAt ? new Date(p.createdAt) : new Date();
        const year = date.getFullYear();
        const month = date.getMonth();
        const sortKey = `${year}-${String(month + 1).padStart(2, "0")}`;
        const label = `${monthNames[month]} ${year}`;

        if (!monthlyMap[sortKey]) {
          monthlyMap[sortKey] = { label, count: 0, sortKey };
        }
        monthlyMap[sortKey].count++;
      });

      const monthlyStats = Object.values(monthlyMap)
        .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
        .map((item) => ({
          month: item.label,
          count: item.count
        }));

      res.status(200).json({
        status: "success",
        data: {
          totalPaths,
          beginnerCount,
          intermediateCount,
          advancedCount,
          categoryStats,
          monthlyStats
        }
      });
    }
  });
}
