/** @format */

"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiResponse } from "@/types/type";

export function useUserManagement(initialData: ApiResponse) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<ApiResponse>(initialData);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [sortField, setSortField] = useState<"name" | "email" | null>(
    (searchParams.get("sort") as "name" | "email") || null
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">(
    (searchParams.get("order") as "asc" | "desc") || "asc"
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("limit")) || 10
  );

  const updateURL = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === null || value === "" || (value === 1 && key === "page")) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });
      router.push(`/users?${newSearchParams.toString()}`);
    },
    [router, searchParams]
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set("q", searchQuery);
      if (sortField) params.set("sort", sortField);
      if (sortOrder) params.set("order", sortOrder);
      if (currentPage > 1) params.set("page", String(currentPage));
      if (pageSize !== 10) params.set("limit", String(pageSize));

      const response = await fetch(`/api/users?${params.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch users");

      const newData = await response.json();
      setData(newData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, sortField, sortOrder, currentPage, pageSize]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // actions
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    updateURL({ q: value, page: null });
  };

  const handleSort = (field: "name" | "email") => {
    const newOrder =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(newOrder);
    setCurrentPage(1);
    updateURL({ sort: field, order: newOrder, page: null });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    updateURL({ page: page > 1 ? page : null });
  };

  const handlePageSizeChange = (size: string) => {
    const newSize = Number(size);
    setPageSize(newSize);
    setCurrentPage(1);
    updateURL({ limit: newSize !== 10 ? newSize : null, page: null });
  };

  return {
    data,
    loading,
    searchQuery,
    sortField,
    sortOrder,
    currentPage,
    pageSize,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
  };
}
