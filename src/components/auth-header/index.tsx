/** @format */

"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOutIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, Button } from "../../../packages";

export function AuthHeader() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        <div className="h-4 w-20 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: "/auth/login" });
  };

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          <AvatarFallback className="bg-primary text-white">
            {session.user?.name?.charAt(0) || <UserIcon className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div className="hidden sm:block">
          <p className="text-sm font-medium ">{session.user?.name}</p>
          <p className="text-xs text-muted-foreground">{session.user?.email}</p>
        </div>
      </div>
      <Button size="sm" onClick={handleSignOut}>
        <LogOutIcon className="h-4 w-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}
