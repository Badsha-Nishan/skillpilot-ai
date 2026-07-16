/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { skillFormSchema, SkillFormInput } from "../utils/validation";
import toast from "react-hot-toast";
import {
  Compass,
  Code,
  CheckCircle,
  Plus,
  Trash2,
  Database,
  RefreshCw,
  Cpu,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import Card, { CardHeader, CardBody } from "./Card";
import Button from "./Button";
import Input from "./Input";
import api from "../services/api";

interface HomeViewProps {
  id?: string;
  backendHealthy: boolean | null;
  triggerHealthCheck: () => void;
}

export default function HomeView({ id, backendHealthy, triggerHealthCheck }: HomeViewProps) {
  // Local state representing client-side tracking in Phase 1
  const [skills, setSkills] = useState([
    { id: "1", name: "TypeScript", category: "Languages", proficiency: "Expert" },
    { id: "2", name: "Express.js", category: "Backend", proficiency: "Advanced" },
    { id: "3", name: "React Query", category: "Frontend", proficiency: "Advanced" },
    { id: "4", name: "Mongoose", category: "Database", proficiency: "Intermediate" },
  ]);

  const [checkingPing, setCheckingPing] = useState(false);
  const [pingResult, setPingResult] = useState<string | null>(null);

  // React Hook Form initialization with Zod schema resolver
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SkillFormInput>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: "",
      category: "",
      proficiency: "Intermediate",
    },
  });

  // Handle skill insertion simulation
  const onSubmit = (data: SkillFormInput) => {
    const newSkill = {
      id: Date.now().toString(),
      ...data,
    };
    setSkills((prev) => [newSkill, ...prev]);
    toast.success(`Successfully registered "${data.name}" profile node!`);
    reset();
  };

  // Handle skill removal
  const handleDelete = (id: string, name: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
    toast.error(`Removed "${name}" from local vector grid.`);
  };

  // Perform backend ping-pong check using API Axios instance
  const handlePingBackend = async () => {
    setCheckingPing(true);
    try {
      const response: any = await api.get("/health");
      setPingResult(`HEALTH STATUS: 200 OK • MSG: ${response.message || "Running"}`);
      toast.success("Telemetry handshake completed successfully.");
    } catch (err: any) {
      setPingResult(`ERROR: ${err.message || "Failed to reach backend"}`);
      toast.error("Handshake timed out or failed.");
    } finally {
      setCheckingPing(false);
    }
  };

  // Prepare chart data based on categories
  const categoryCounts = skills.reduce((acc: any, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCounts).map((key) => ({
    name: key,
    nodes: categoryCounts[key],
  }));

  return (
    <div id={id} className="space-y-10">
      {/* Hero Welcome banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-900 to-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-md">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-300 text-xs font-mono mb-4">
            <Cpu className="h-3 w-3 animate-pulse" /> SYSTEM PHASE 1 CORE PLATFORM READY
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">
            Your Comprehensive Flight Path to Career Mastery
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Welcome to the SkillPilot AI platform foundation. We have bootstrapped a clean, enterprise-grade architecture. In Phase 1, you can register skills, visualize vectors, and verify real-time backend health diagnostics.
          </p>
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent hidden md:block" />
      </div>

      {/* Database Connection & Handshake Diagnostics Panel */}
      <Card>
        <CardHeader className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-brand-50 rounded-lg flex items-center justify-center text-brand-600 border border-brand-100">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">API Gateway Handshake Telemetry</h3>
              <p className="text-xs text-slate-500">Verify direct inter-process communication between Frontend and Backend</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              isLoading={checkingPing}
              onClick={handlePingBackend}
              leftIcon={<RefreshCw className="h-3.5 w-3.5" />}
            >
              Verify Connection
            </Button>
          </div>
        </CardHeader>
        <CardBody className="bg-slate-50/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col justify-center">
              <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2 block">
                Diagnostics Status
              </span>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${backendHealthy ? "bg-emerald-500" : "bg-rose-500"}`} />
                  <span className="text-sm font-medium text-slate-700">
                    Backend Connection: {backendHealthy ? "ONLINE (Express v4)" : "OFFLINE / CONNECTING"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium text-slate-700">
                    Platform Env: Docker Ingress Integration (Port 3000)
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-900 rounded-lg font-mono text-xs text-brand-300 border border-slate-800 shadow-inner flex items-center justify-between">
              <div>
                <p className="text-slate-500 mb-1"># telemetry response output</p>
                <p>{pingResult || "Awaiting diagnostics signal..."}</p>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Main interactive grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Setup (Zod/ReactHookForm) */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <CardHeader className="border-b border-slate-100">
              <h3 className="font-bold text-slate-900">Add Skill Node</h3>
              <p className="text-xs text-slate-500">Register new capabilities utilizing clean Zod schema validation</p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  id="name"
                  label="Skill Name"
                  placeholder="e.g. Next.js, Docker, Rust"
                  error={errors.name?.message}
                  {...register("name")}
                />

                <Input
                  id="category"
                  label="Category Group"
                  placeholder="e.g. Frontend, Backend, Devops"
                  error={errors.category?.message}
                  {...register("category")}
                />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="proficiency" className="text-sm font-medium text-slate-700 select-none">
                    Proficiency Vector
                  </label>
                  <select
                    id="proficiency"
                    className={`w-full rounded-lg border bg-white px-3 py-2 text-sm text-slate-900 transition-colors duration-150 focus:outline-none focus:ring-2 ${
                      errors.proficiency
                        ? "border-red-500 focus:ring-red-500"
                        : "border-slate-300 focus:ring-brand-500 focus:border-brand-500"
                    }`}
                    {...register("proficiency")}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Expert">Expert</option>
                  </select>
                  {errors.proficiency && (
                    <p className="text-xs text-red-600 font-medium">{errors.proficiency.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-4"
                  isLoading={isSubmitting}
                  leftIcon={<Plus className="h-4 w-4" />}
                >
                  Register Vector Node
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Right Column: Visualization Chart (Recharts) */}
        <div className="lg:col-span-7">
          <Card className="h-full">
            <CardHeader className="border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900">Skill Density Visualizer</h3>
                <p className="text-xs text-slate-500">Live categories visual density report built with Recharts</p>
              </div>
              <TrendingUp className="h-5 w-5 text-brand-500" />
            </CardHeader>
            <CardBody className="flex flex-col justify-between h-[300px]">
              {chartData.length > 0 ? (
                <div className="h-full w-full min-h-[220px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{ backgroundColor: "#1e293b", borderRadius: "8px", border: "none" }}
                        labelStyle={{ color: "#94a3b8", fontWeight: "bold" }}
                        itemStyle={{ color: "#f8fafc" }}
                      />
                      <Bar dataKey="nodes" fill="#4f73a5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <p>Register skills to generate dynamic metrics</p>
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Grid of existing items with Trash deletion */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-900">Active Skill Telemetry Grid ({skills.length})</h3>
              <p className="text-xs text-slate-500">Standard table representation demonstrating custom state removal workflow</p>
            </div>
            <Code className="h-5 w-5 text-slate-400" />
          </div>
        </CardHeader>
        <CardBody className="p-0 overflow-x-auto">
          {skills.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-mono text-xs uppercase">
                  <th className="px-6 py-3 font-semibold">Skill Name</th>
                  <th className="px-6 py-3 font-semibold">Category Group</th>
                  <th className="px-6 py-3 font-semibold">Proficiency</th>
                  <th className="px-6 py-3 font-semibold text-right">Telemetry Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {skills.map((skill) => (
                  <tr key={skill.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-slate-800">{skill.name}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200">
                        {skill.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold ${
                          skill.proficiency === "Expert"
                            ? "text-purple-700"
                            : skill.proficiency === "Advanced"
                            ? "text-blue-700"
                            : "text-slate-600"
                        }`}
                      >
                        <CheckCircle className="h-3.5 w-3.5 fill-current opacity-80" />
                        {skill.proficiency}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(skill.id, skill.name)}
                        className="text-slate-400 hover:text-red-600 transition-colors p-1.5 rounded-lg hover:bg-red-50"
                        title="Delete telemetry entry"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-12 text-center text-slate-400">
              <p className="text-sm">No telemetry grid profiles registered. Add some above.</p>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
