/** @format */

"use client";

import { AuthProvider } from "@/hooks/auth-provider";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
