/** @format */

"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/shared/helpers/validate";
import { LoginComponent } from "@/components/ui/auth";

type LoginFormData = z.infer<typeof loginSchema>;

const LoginContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/users";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (values: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError("password", { message: "Invalid email or password" });
      } else {
        await getSession();
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError("password", { message: "An error occurred during sign in" });
    }
  });

  return (
    <LoginComponent
      register={register}
      errors={errors}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    />
  );
};

export default LoginContainer;
