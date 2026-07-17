/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import Card, { CardHeader, CardBody } from "./Card";

interface DashboardChartsProps {
  id?: string;
  beginnerCount: number;
  intermediateCount: number;
  advancedCount: number;
  categoryStats: Array<{ category: string; count: number }>;
  monthlyStats: Array<{ month: string; count: number }>;
}

const LEVEL_COLORS = {
  Beginner: "#6366f1", // indigo-500
  Intermediate: "#f59e0b", // amber-500
  Advanced: "#f43f5e", // rose-500
};

const PIE_COLORS = [
  "#6366f1", // indigo
  "#06b6d4", // cyan
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ec4899", // pink
  "#8b5cf6", // violet
];

export default function DashboardCharts({
  id,
  beginnerCount,
  intermediateCount,
  advancedCount,
  categoryStats,
  monthlyStats,
}: DashboardChartsProps) {
  // 1. Bar Chart Data (By Level)
  const levelData = [
    { name: "Beginner", count: beginnerCount, fill: LEVEL_COLORS.Beginner },
    { name: "Intermediate", count: intermediateCount, fill: LEVEL_COLORS.Intermediate },
    { name: "Advanced", count: advancedCount, fill: LEVEL_COLORS.Advanced },
  ];

  // 2. Pie Chart Data (By Category)
  const categoryData = categoryStats.map((item) => ({
    name: item.category,
    value: item.count,
  }));

  // 3. Line Chart Data (Created Over Time)
  // Ensure we have at least some monthly points if stats are empty
  const timeData = monthlyStats.length > 0 
    ? monthlyStats 
    : [{ month: "No Trajectories", count: 0 }];

  // Custom tooltips to maintain styling theme
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 text-white p-3 rounded-lg border border-slate-800 shadow-xl text-left font-sans text-xs">
          {label && <p className="font-bold text-slate-400 mb-1">{label}</p>}
          <p className="font-semibold">
            {payload[0].name}: <span className="text-brand-400 font-bold">{payload[0].value}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div id={id} className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      {/* 1. Bar Chart: Paths by Level */}
      <Card className="lg:col-span-6 border border-slate-200/80">
        <CardHeader className="border-b border-slate-100 bg-slate-50/20 py-4.5">
          <h3 className="text-sm font-bold text-slate-800">Learning Paths by Level</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Syllabus difficulty vector distribution</p>
        </CardHeader>
        <CardBody className="p-6">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={levelData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f8fafc" }} />
                <Bar dataKey="count" name="Learning Paths" radius={[6, 6, 0, 0]}>
                  {levelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>

      {/* 2. Pie Chart: Paths by Category */}
      <Card className="lg:col-span-6 border border-slate-200/80">
        <CardHeader className="border-b border-slate-100 bg-slate-50/20 py-4.5">
          <h3 className="text-sm font-bold text-slate-800">Learning Paths by Category</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Thematic quadrant segmentation</p>
        </CardHeader>
        <CardBody className="p-6 flex flex-col sm:flex-row items-center justify-center gap-6">
          {categoryData.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs font-medium font-mono">
              No categories mapped
            </div>
          ) : (
            <>
              <div className="h-56 w-56 shrink-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center count decoration */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-2xl font-black text-slate-900">
                    {categoryData.reduce((acc, curr) => acc + curr.value, 0)}
                  </span>
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                    Paths
                  </span>
                </div>
              </div>

              {/* Legends list */}
              <div className="flex-grow space-y-2 w-full sm:w-auto">
                {categoryData.map((entry, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-2 truncate max-w-[160px]">
                      <span
                        className="h-2.5 w-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }}
                      />
                      <span className="text-slate-600 truncate">{entry.name}</span>
                    </div>
                    <span className="text-slate-900 font-mono font-bold bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded ml-2">
                      {entry.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </CardBody>
      </Card>

      {/* 3. Line Chart: Paths Created Over Time */}
      <Card className="lg:col-span-12 border border-slate-200/80">
        <CardHeader className="border-b border-slate-100 bg-slate-50/20 py-4.5">
          <h3 className="text-sm font-bold text-slate-800">Learning Paths Created Over Time</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">Chronological trajectory velocity index</p>
        </CardHeader>
        <CardBody className="p-6">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeData} margin={{ top: 10, right: 15, left: -25, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#94a3b8"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="count"
                  name="Created Paths"
                  stroke="#4f46e5" // indigo-600
                  strokeWidth={3}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                  dot={{ r: 4, strokeWidth: 1.5, fill: "#fff", stroke: "#4f46e5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
