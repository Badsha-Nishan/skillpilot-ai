/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerFormSchema, RegisterFormInput } from "../utils/validation";
import { useAuth } from "../providers/AuthProvider";
import { UserPlus, User, Mail, Lock } from "lucide-react";
import Card, { CardHeader, CardBody } from "./Card";
import Input from "./Input";
import Button from "./Button";

interface RegisterViewProps {
  id?: string;
  onSwitchToLogin?: () => void;
  onSuccess?: () => void;
}

export default function RegisterView({ id, onSwitchToLogin, onSuccess }: RegisterViewProps) {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormInput>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: RegisterFormInput) => {
    try {
      await registerUser(data.name, data.email, data.password);
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
            <UserPlus className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Register Vector Node
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Initialize your SkillPilot AI telemetry telemetry accounts
          </p>
        </CardHeader>

        <CardBody className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <Input
              id="name"
              label="Full Pilot Name"
              type="text"
              placeholder="e.g. Alex Henderson"
              error={errors.name?.message}
              {...register("name")}
            />

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
              label="Access Security Passcode"
              type="password"
              placeholder="••••••••••••"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button
              type="submit"
              className="w-full mt-2 font-bold"
              isLoading={isSubmitting}
              leftIcon={<UserPlus className="h-4 w-4" />}
            >
              Construct Profile & Launch
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Already have an registered pilot account?{" "}
              {onSwitchToLogin ? (
                <button
                  type="button"
                  onClick={onSwitchToLogin}
                  className="text-brand-600 hover:text-brand-700 font-semibold underline decoration-2 underline-offset-4"
                >
                  Sign In Matrix
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-brand-600 hover:text-brand-700 font-semibold underline decoration-2 underline-offset-4"
                >
                  Sign In Matrix
                </Link>
              )}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
