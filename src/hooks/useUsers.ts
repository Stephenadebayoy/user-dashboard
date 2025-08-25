/** @format */
"use client";

import { useEffect, useState } from "react";
import { ApiResponse } from "@/types/type";

interface UseUsersProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export function useUsers({ searchParams }: UseUsersProps) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const params = new URLSearchParams();

      if (searchParams.q) params.set("q", searchParams.q as string);
      if (searchParams.sort) params.set("sort", searchParams.sort as string);
      if (searchParams.order) params.set("order", searchParams.order as string);
      if (searchParams.page) params.set("page", searchParams.page as string);
      if (searchParams.limit) params.set("limit", searchParams.limit as string);

      const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
        ? `${process.env.NEXT_PUBLIC_VERCEL_URL}`
        : "http://localhost:3000";

      try {
        setLoading(true);
        const response = await fetch(
          `${baseUrl}/api/users?${params.toString()}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch users: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [JSON.stringify(searchParams)]);

  return { data, error, loading };
}
