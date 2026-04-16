"use client";

import { LogOut, UserRound } from "lucide-react";
import {
  useLogoutMutation,
  useMeQuery,
} from "@/app/features/auth/hooks/use-auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function HeaderUserMenu() {
  const { data: me } = useMeQuery();
  const { logout, isPending: isLoggingOut } = useLogoutMutation();

  const fullName = [me?.firstName, me?.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  const displayName = fullName || me?.username || "User";
  const initials = getInitials(displayName);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="h-9 gap-2 rounded-full px-1 pr-2"
          aria-label="Open profile menu"
        >
          <Avatar size="sm">
            <AvatarImage src={me?.image} alt={displayName} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className="max-w-32 truncate text-sm text-foreground">
            {displayName}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="space-y-0.5">
          <p className="font-medium text-foreground">{displayName}</p>
          <p className="text-xs text-muted-foreground">{me?.email ?? ""}</p>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled className="gap-2">
          <UserRound className="size-4" />
          <span>Signed in</span>
        </DropdownMenuItem>

        <DropdownMenuItem
          onSelect={(event) => {
            event.preventDefault();
            if (!isLoggingOut) {
              logout();
            }
          }}
          variant="destructive"
          className="gap-2"
          disabled={isLoggingOut}
        >
          <LogOut className="size-4" />
          <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
