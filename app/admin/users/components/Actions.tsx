"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type User = {
  id: string
  name?: string | null
  email?: string | null
  role?: string | null
  banned?: boolean | null
}

type ActionType =
  | "makeAdmin"
  | "resetPassword"
  | "updateUser"
  | "viewSessions"
  | "revokeAllSessions"
  | "impersonate"
  | "ban"
  | "unban"
  | "remove"

interface ActionsProps {
  user: User
  onAction: (type: ActionType, user: User) => void
}

export default function Actions({
  user,
  onAction,
}: ActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        Actions
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>
            User Actions
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={user.role === "admin"}
            onClick={() => onAction("makeAdmin", user)}
          >
            Make Admin
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("resetPassword", user)}
          >
            Reset Password
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("updateUser", user)}
          >
            Update User
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("viewSessions", user)}
          >
            View Sessions
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("revokeAllSessions", user)}
          >
            Revoke All Sessions
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onAction("impersonate", user)}
          >
            Impersonate User
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {user.banned ? (
            <DropdownMenuItem
              onClick={() => onAction("unban", user)}
            >
              Unban User
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem
              onClick={() => onAction("ban", user)}
            >
              Ban User
            </DropdownMenuItem>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            variant="destructive"
            onClick={() => onAction("remove", user)}
          >
            Remove User
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export type { ActionType, User }