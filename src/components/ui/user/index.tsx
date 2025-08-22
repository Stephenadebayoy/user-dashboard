/** @format */
"use client";

import { Suspense } from "react";
import { AuthHeader } from "@/components/auth-header";
import { UserManagementClient } from "./user-management";
import UserManagementSkeleton from "@/components/user-management-skeleton";
import { useUsers } from "@/hooks/useUsers";

interface UsersPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function UsersPage({ searchParams }: UsersPageProps) {
  const { data, error, loading } = useUsers({ searchParams });

  if (loading) {
    return <UserManagementSkeleton />;
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b border-b-gray-500 bg-card shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold ">User Management</h1>
              <AuthHeader />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-destructive  p-6 text-center">
            <h2 className="text-lg font-semibold text-red-400">
              Error Loading Users
            </h2>
            <p className="mt-2 text-red-400">
              Failed to load user data. Please try again later.
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen  bg-white">
      <header className="border-b border-b-gray-200 fixed left-0 right-0 bg-white z-50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold ">User Management</h1>
              <p className="mt-2 text-muted-foreground">
                Manage and view user information from your system
              </p>
            </div>
            <AuthHeader />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 pt-40">
        <Suspense fallback={<UserManagementSkeleton />}>
          <UserManagementClient initialData={data} />
        </Suspense>
      </main>
    </div>
  );
}
