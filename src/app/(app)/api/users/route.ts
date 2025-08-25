/** @format */

import { ApiResponse, User } from "@/types/type";
import { type NextRequest, NextResponse } from "next/server";

// Cache for storing fetched users (in-memory cache)
let cachedUsers: User[] | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 1000; // 60 seconds

async function fetchUsersFromSource(): Promise<User[]> {
  if (
    cachedUsers &&
    cacheTimestamp &&
    Date.now() - cacheTimestamp < CACHE_DURATION
  ) {
    return cachedUsers;
  }

  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch users: ${response.status}`);
  }

  const users: User[] = await response.json();
  cachedUsers = users;
  cacheTimestamp = Date.now();

  return users;
}

function validateQueryParams(searchParams: URLSearchParams) {
  const errors: string[] = [];
  const page = searchParams.get("page");
  const limit = searchParams.get("limit");
  const sort = searchParams.get("sort");
  const order = searchParams.get("order");

  if (page && (isNaN(Number(page)) || Number(page) < 1)) {
    errors.push("Page must be a positive integer");
  }

  if (
    limit &&
    (isNaN(Number(limit)) || Number(limit) < 1 || Number(limit) > 100)
  ) {
    errors.push("Limit must be between 1 and 100");
  }

  if (sort && !["name", "email"].includes(sort)) {
    errors.push('Sort must be either "name" or "email"');
  }

  if (order && !["asc", "desc"].includes(order)) {
    errors.push('Order must be either "asc" or "desc"');
  }

  return errors;
}

function filterUsers(users: User[], query?: string): User[] {
  if (!query) return users;
  const searchTerm = query.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );
}

function sortUsers(users: User[], sortBy?: string, order?: string): User[] {
  if (!sortBy) return users;

  const sortedUsers = [...users].sort((a, b) => {
    let aValue: string;
    let bValue: string;

    if (sortBy === "name") {
      aValue = a.name.toLowerCase();
      bValue = b.name.toLowerCase();
    } else if (sortBy === "email") {
      aValue = a.email.toLowerCase();
      bValue = b.email.toLowerCase();
    } else {
      return 0;
    }

    if (aValue < bValue) return order === "desc" ? 1 : -1;
    if (aValue > bValue) return order === "desc" ? -1 : 1;
    return 0;
  });

  return sortedUsers;
}

function paginateUsers(users: User[], page: number, limit: number): User[] {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  return users.slice(startIndex, endIndex);
}

// --- Reusable CORS headers ---
const corsHeaders: HeadersInit = {
  "Access-Control-Allow-Origin": "https://user-dashboard-one-delta.vercel.app",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Accept",
  "Access-Control-Allow-Credentials": "true",
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const validationErrors = validateQueryParams(searchParams);

    if (validationErrors.length > 0) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid query parameters",
          details: validationErrors,
        }),
        { status: 400, headers: corsHeaders }
      );
    }

    const query = searchParams.get("q") || undefined;
    const sortBy = searchParams.get("sort") || undefined;
    const order = searchParams.get("order") || "asc";
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");

    const allUsers = await fetchUsersFromSource();
    const filteredUsers = filterUsers(allUsers, query);
    const sortedUsers = sortUsers(filteredUsers, sortBy, order);

    const total = sortedUsers.length;
    const totalPages = Math.ceil(total / limit);
    const paginatedUsers = paginateUsers(sortedUsers, page, limit);

    const response: ApiResponse = {
      data: paginatedUsers,
      meta: { page, limit, total, totalPages },
    };

    return new NextResponse(JSON.stringify(response), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse(
      JSON.stringify({
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// --- Handle preflight requests ---
export async function OPTIONS() {
  return new NextResponse(null, { status: 200, headers: corsHeaders });
}
