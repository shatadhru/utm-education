"use client"

import {
  BadgeCheckIcon,
  BellIcon,
  CreditCardIcon,
  LogOutIcon,
  ChevronDownIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
})

export function DropdownMenuAvatar() {
  const { data: session, isPending } = authClient.useSession()

  const handleSignOut = async () => {
    await authClient.signOut()
  }

  // Loading state
  if (isPending) {
    return (
      <div className="flex items-center gap-3 rounded-full  px-2 py-1.5">
        <div className="size-8 animate-pulse rounded-full bg-primary/20" />

        <div className="hidden space-y-1 md:block">
          <div className="h-3.5 w-20 animate-pulse rounded bg-primary/20" />
          <div className="h-2.5 w-28 animate-pulse rounded bg-muted" />
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!session) {
    return (
      <Button
        variant="default"
        className="rounded-full bg-primary hover:border-primary hover:bg-primary"
        onClick={() =>
         window.location.href = "/auth/login"
        }
      >
        Sign In
      </Button>
    )
  }

  const user = session.user

  const fallback =
    user.name?.charAt(0).toUpperCase() ||
    user.email?.charAt(0).toUpperCase() ||
    "U"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          className="
            h-auto
            rounded-full
            border
            px-2
            py-1.5
            transition-all
            hover:border-primary/50
            hover:bg-primary/[0.08]
            hover:shadow-sm
            focus-visible:ring-2
            focus-visible:ring-primary/30
          "
        >
          {/* Avatar */}
          <Avatar className="size-9 border-2 border-primary/20">
            <AvatarImage
              src={user.image || ""}
              alt={user.name || "User"}
            />

            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {fallback}
            </AvatarFallback>
          </Avatar>

          {/* User Information */}
          <div className="hidden min-w-0 text-left md:block">
            <p className="max-w-[140px] truncate text-sm font-semibold leading-tight">
              {user.name || "User"}
            </p>

            <p className="max-w-[140px] truncate text-xs text-muted-foreground">
              {user.email || "Account"}
            </p>
          </div>

          {/* Chevron */}
          <ChevronDownIcon className="mr-1 hidden size-4 text-primary/70 md:block" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-64 rounded-xl border-primary/10 p-2 shadow-lg"
      >
        {/* Profile Header */}
        <div className="mb-1 flex items-center gap-3 rounded-lg bg-primary/[0.06] p-3">
          <Avatar className="size-10 border-2 border-primary/20">
            <AvatarImage
              src={user.image || ""}
              alt={user.name || "User"}
            />

            <AvatarFallback className="bg-primary/10 font-semibold text-primary">
              {fallback}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">
              {user.name || "User"}
            </p>

            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer rounded-lg">
            <BadgeCheckIcon className="mr-2 size-4 text-primary" />
            <span>Account</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer rounded-lg">
            <CreditCardIcon className="mr-2 size-4 text-primary" />
            <span>Billing</span>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer rounded-lg">
            <BellIcon className="mr-2 size-4 text-primary" />
            <span>Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer rounded-lg text-destructive focus:text-destructive"
        >
          <LogOutIcon className="mr-2 size-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}