/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useForm } from "react-hook-form";
import { Send, Mail, MapPin, Phone, ShieldAlert, Sparkles } from "lucide-react";
import Card, { CardHeader, CardBody } from "./Card";
import Button from "./Button";
import Input from "./Input";
import toast from "react-hot-toast";

interface ContactFormInput {
  name: string;
  email: string;
  signalType: string;
  message: string;
}

export default function ContactView() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput>({
    defaultValues: {
      name: "",
      email: "",
      signalType: "support",
      message: "",
    },
  });

  const onSubmit = (data: ContactFormInput) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        toast.success(`Telemetry message dispatched! ID: ${Math.floor(Math.random() * 900000 + 100000)}`);
        reset();
        resolve();
      }, 1000);
    });
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto text-left">
      {/* Header block */}
      <div className="border-b border-slate-200 pb-5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-brand-50 text-brand-700 rounded-md text-xs font-mono mb-3">
          <Sparkles className="h-3.5 w-3.5" /> COMMUNICATIONS COUPLING
        </div>
        <h1 className="text-3xl font-extrabold text-slate-950 tracking-tight leading-tight">
          Dispatch Flight Signals
        </h1>
        <p className="text-slate-500 text-sm md:text-base mt-2 leading-relaxed">
          Report database telemetry anomalies, verify corporate integration profiles, or query pilot credentials.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Form Column */}
        <div className="md:col-span-7">
          <Card className="border border-slate-200">
            <CardHeader className="border-b border-slate-100 bg-slate-50/30">
              <h3 className="font-bold text-slate-900">Transmit Signal Buffer</h3>
              <p className="text-xs text-slate-500">Provide required metadata to initiate connection handshake</p>
            </CardHeader>
            <CardBody className="p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Input
                  id="name"
                  label="Pilot Identifier (Name)"
                  placeholder="e.g. Flight Officer Alex"
                  error={errors.name?.message}
                  {...register("name", { required: "Name is required to align signals." })}
                />

                <Input
                  id="email"
                  label="Response Coordinate (Email)"
                  type="email"
                  placeholder="alex@skillpilot.ai"
                  error={errors.email?.message}
                  {...register("email", {
                    required: "Email is required.",
                    pattern: { value: /^\S+@\S+$/i, message: "Provide a valid email coordinate." },
                  })}
                />

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="signalType" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Signal Classification
                  </label>
                  <select
                    id="signalType"
                    {...register("signalType")}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-brand-500/15"
                  >
                    <option value="support">Technical Support</option>
                    <option value="curriculum">Curriculum Collaboration</option>
                    <option value="infrastructure">Infrastructure Feedback</option>
                    <option value="enterprise">Enterprise Licensing</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                    Message Payload
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Enter message details..."
                    {...register("message", {
                      required: "Please provide a details message payload.",
                      minLength: { value: 10, message: "Payload must be at least 10 characters." },
                    })}
                    className={`w-full px-3.5 py-2 text-sm bg-white border rounded-xl placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-brand-500/15 ${
                      errors.message ? "border-red-300" : "border-slate-200"
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-600 font-semibold">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full mt-2 font-bold uppercase tracking-wide text-xs"
                  isLoading={isSubmitting}
                  leftIcon={<Send className="h-3.5 w-3.5" />}
                >
                  Transmit Signal
                </Button>
              </form>
            </CardBody>
          </Card>
        </div>

        {/* Right Info Column */}
        <div className="md:col-span-5 space-y-6">
          <Card className="border border-slate-200/80 bg-slate-50/20">
            <CardBody className="p-6 space-y-6">
              <h3 className="font-bold text-slate-900 text-sm tracking-tight border-b border-slate-150 pb-2">
                Operational Node Coordinates
              </h3>

              <div className="space-y-4 text-xs text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800">Primary Server Matrix</h4>
                    <p className="mt-0.5">Vector Tower 4, Sector 70</p>
                    <p>Singapore Ingress Center</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800">Support Coordinate</h4>
                    <p className="mt-0.5 font-mono text-[11px]">telemetry@skillpilot.ai</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-slate-800">Hotline Gateway</h4>
                    <p className="mt-0.5 font-mono text-[11px]">+65 900-VECTORS (8328)</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="border border-yellow-200 bg-yellow-50/15">
            <CardBody className="p-5 flex gap-3">
              <ShieldAlert className="h-5 w-5 text-yellow-600 shrink-0" />
              <p className="text-xs text-yellow-800 leading-relaxed">
                <strong>Attention Pilot:</strong> Do not dispatch raw security tokens, private keys, or passwords over signal channels. Use official settings to refresh keys.
              </p>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
}
