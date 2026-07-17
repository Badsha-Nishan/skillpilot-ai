/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, LoginFormInput } from "../utils/validation";
import { useAuth } from "../providers/AuthProvider";
import { Lock, LogIn, Key, Mail } from "lucide-react";
import Card, { CardHeader, CardBody } from "./Card";
import Input from "./Input";
import Button from "./Button";

interface LoginViewProps {
  id?: string;
  onSwitchToRegister?: () => void;
  onSuccess?: () => void;
}

export default function LoginView({ id, onSwitchToRegister, onSuccess }: LoginViewProps) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInput>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormInput) => {
    try {
      await login(data.email, data.password);
      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      // Handled inside AuthProvider via toasts
    }
  };

  return (
    <div id={id} className="max-w-md mx-auto my-12 text-left">
      <Card className="shadow-lg border-slate-200">
        <CardHeader className="text-center bg-slate-50/50 py-6 border-b border-slate-100">
          <div className="h-12 w-12 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mx-auto mb-3">
            <Lock className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Verify Identity
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access your SkillPilot AI telemetry logs and vector models
          </p>
        </CardHeader>

        <CardBody className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="email"
              label="Vector Email Address"
              type="email"
              placeholder="e.g. name@domain.com"
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              id="password"
              label="Session Security Phrase"
              type="password"
              placeholder="••••••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              className="w-full mt-2 font-bold"
              isLoading={isSubmitting}
              leftIcon={<LogIn className="h-4 w-4" />}
            >
              Authenticate & Decrypt
            </Button>
          </form>

          {/* Sandbox Credentials Guide */}
          <div className="mt-6 p-4 bg-amber-50/60 border border-amber-200/50 rounded-lg">
            <div className="flex gap-2.5 items-start">
              <Key className="h-4.5 w-4.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-xs text-amber-800">
                <span className="font-bold">Sandbox Seed Account Profile:</span>
                <div className="mt-1 flex flex-col gap-0.5 font-mono">
                  <span className="flex items-center gap-1">
                    <Mail className="h-3 w-3" /> demo@skillpilot.ai
                  </span>
                  <span>PW: password123</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              New to the space platform?{" "}
              {onSwitchToRegister ? (
                <button
                  type="button"
                  onClick={onSwitchToRegister}
                  className="text-brand-600 hover:text-brand-700 font-semibold underline decoration-2 underline-offset-4"
                >
                  Register Vector Node
                </button>
              ) : (
                <Link
                  to="/register"
                  className="text-brand-600 hover:text-brand-700 font-semibold underline decoration-2 underline-offset-4"
                >
                  Register Vector Node
                </Link>
              )}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
