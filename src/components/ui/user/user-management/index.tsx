/** @format */

"use client";

import {
  Button,
  Card,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../../packages";
import { ChevronUpIcon, ChevronDownIcon, SearchIcon } from "lucide-react";
import { ApiResponse, User } from "@/types/type";
import SearchBar from "@/components/search-bar";
import { useUserManagement } from "@/hooks/useUserManagement";

interface UserManagementClientProps {
  initialData: ApiResponse;
}

export function UserManagementClient({
  initialData,
}: UserManagementClientProps) {
  const {
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
  } = useUserManagement(initialData);

  const getSortIcon = (field: "name" | "email") => {
    if (sortField !== field) return null;
    return sortOrder === "asc" ? (
      <ChevronUpIcon className="ml-1 cursor-pointer h-4 w-4" />
    ) : (
      <ChevronDownIcon className="ml-1 cursor-pointer  h-4 w-4" />
    );
  };

  if (data.data.length === 0 && !loading) {
    return (
      <div className="space-y-6">
        <SearchBar value={searchQuery} onChange={handleSearch} />
        <Card className="p-12 text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
            <SearchIcon className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No users found</h3>
          <p className="text-muted-foreground">
            No users available at the moment
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search */}
      <SearchBar value={searchQuery} onChange={handleSearch} />

      {/* Table */}
      <Card className="overflow-hidden relative">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("name")}
                    className="h-auto p-0 font-semibold hover:text-accent"
                  >
                    Name {getSortIcon("name")}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    onClick={() => handleSort("email")}
                    className="h-auto p-0 font-semibold hover:text-accent"
                  >
                    Email {getSortIcon("email")}
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Phone</TableHead>
                <TableHead className="font-semibold">Website</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((user: User) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-muted/30 transition-colors"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm">@{user.username}</div>
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 hover:underline"
                    >
                      {user.website}
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        )}
      </Card>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Show</span>
          <Select value={String(pageSize)} onValueChange={handlePageSizeChange}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm">of {data.meta.total} users</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || loading}
          >
            Previous
          </Button>
          <div className="flex items-center gap-1">
            {Array.from(
              { length: Math.min(5, data.meta.totalPages) },
              (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    disabled={loading}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              }
            )}
          </div>
          <Button
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === data.meta.totalPages || loading}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
