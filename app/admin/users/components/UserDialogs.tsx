"use client"

import { useEffect, useState } from "react"
import { authClient } from "@/lib/auth-client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import type { User } from "./Actions"

interface DialogProps {
  user: User | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void | Promise<void>
}

function getErrorMessage(
  error: unknown,
  fallback: string
) {
  if (error instanceof Error && error.message) {
    return error.message
  }

  if (typeof error === "string") {
    return error
  }

  return fallback
}

/* -------------------------------------------------------------------------- */
/* Make Admin                                                                */
/* -------------------------------------------------------------------------- */

export function MakeAdminDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: DialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { error } = await authClient.admin.setRole({
        userId: user.id,
        role: "admin",
      })

      if (error) {
        throw error
      }

      await onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to make user an admin."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Make {user?.name ?? "this user"} an admin?
          </DialogTitle>

          <DialogDescription>
            This will grant administrative privileges to{" "}
            {user?.email}.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Make Admin"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Reset Password                                                            */
/* -------------------------------------------------------------------------- */

export function ResetPasswordDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: DialogProps) {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      setPassword("")
      setError(null)
    }
  }, [open])

  const handleSubmit = async () => {
    if (!user) return

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      )
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } =
        await authClient.admin.setUserPassword({
          userId: user.id,
          newPassword: password,
        })

      if (error) {
        throw error
      }

      await onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to reset password."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Reset Password
          </DialogTitle>

          <DialogDescription>
            Set a new password for{" "}
            <strong>{user?.email}</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="new-user-password">
            New Password
          </Label>

          <Input
            id="new-user-password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter new password"
            autoComplete="new-password"
          />
        </div>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : "Reset Password"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Update User                                                               */
/* -------------------------------------------------------------------------- */

export function UpdateUserDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: DialogProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (open && user) {
      setName(user.name ?? "")
      setEmail(user.email ?? "")
      setRole(user.role ?? "")
      setError(null)
    }
  }, [open, user])

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { error } =
        await authClient.admin.updateUser({
          userId: user.id,
          data: {
            name,
            email,
            role,
          },
        })

      if (error) {
        throw error
      }

      await onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to update user."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Update User
          </DialogTitle>

          <DialogDescription>
            Update the user's account information.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="update-user-name">
              Name
            </Label>

            <Input
              id="update-user-name"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-user-email">
              Email
            </Label>

            <Input
              id="update-user-email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="update-user-role">
              Role
            </Label>

            <Input
              id="update-user-role"
              value={role}
              onChange={(event) =>
                setRole(event.target.value)
              }
              placeholder="user / admin"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* View Sessions                                                             */
/* -------------------------------------------------------------------------- */

type UserSession = {
  id?: string
  token?: string
  expiresAt?: string | Date
  createdAt?: string | Date
  updatedAt?: string | Date
  ipAddress?: string | null
  userAgent?: string | null
}

export function ViewSessionsDialog({
  user,
  open,
  onOpenChange,
}: DialogProps) {
  const [sessions, setSessions] = useState<
    UserSession[]
  >([])

  const [loading, setLoading] = useState(false)
  const [revoking, setRevoking] = useState<
    string | null
  >(null)

  const [error, setError] = useState<string | null>(
    null
  )

  const loadSessions = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { data, error } =
        await authClient.admin.listUserSessions({
          userId: user.id,
        })

      if (error) {
        throw error
      }

      setSessions(
        Array.isArray(data)
          ? data
          : []
      )
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to fetch user sessions."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (open && user) {
      loadSessions()
    }

    if (!open) {
      setSessions([])
      setError(null)
    }
  }, [open, user])

  const revokeSession = async (
    sessionToken: string
  ) => {
    setRevoking(sessionToken)
    setError(null)

    try {
      const { error } =
        await authClient.admin.revokeUserSession({
          sessionToken,
        })

      if (error) {
        throw error
      }

      setSessions((current) =>
        current.filter(
          (session) =>
            session.token !== sessionToken
        )
      )
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to revoke session."
        )
      )
    } finally {
      setRevoking(null)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            Active Sessions
          </DialogTitle>

          <DialogDescription>
            Sessions belonging to{" "}
            <strong>{user?.email}</strong>.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            Loading sessions...
          </div>
        ) : sessions.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No active sessions found.
          </div>
        ) : (
          <div className="max-h-[400px] space-y-3 overflow-y-auto">
            {sessions.map((session, index) => {
              const token = session.token

              if (!token) {
                return null
              }

              return (
                <div
                  key={
                    session.id ??
                    token ??
                    index
                  }
                  className="rounded-lg border p-4"
                >
                  <div className="space-y-1 text-sm">
                    <p>
                      <strong>
                        IP:
                      </strong>{" "}
                      {session.ipAddress ??
                        "Unknown"}
                    </p>

                    <p>
                      <strong>
                        User Agent:
                      </strong>{" "}
                      {session.userAgent ??
                        "Unknown"}
                    </p>

                    <p>
                      <strong>
                        Expires:
                      </strong>{" "}
                      {session.expiresAt
                        ? new Date(
                            session.expiresAt
                          ).toLocaleString()
                        : "Unknown"}
                    </p>
                  </div>

                  <div className="mt-3">
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() =>
                        revokeSession(
                          token
                        )
                      }
                      disabled={
                        revoking ===
                        token
                      }
                    >
                      {revoking === token
                        ? "Revoking..."
                        : "Revoke Session"}
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
          >
            Close
          </Button>

          <Button
            onClick={loadSessions}
            disabled={loading}
          >
            Refresh
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Revoke All Sessions                                                       */
/* -------------------------------------------------------------------------- */

export function RevokeAllSessionsDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: DialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    null
  )

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { error } =
        await authClient.admin.revokeUserSessions({
          userId: user.id,
        })

      if (error) {
        throw error
      }

      await onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to revoke all sessions."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Revoke All Sessions?
          </DialogTitle>

          <DialogDescription>
            This will sign{" "}
            <strong>
              {user?.name ?? user?.email}
            </strong>{" "}
            out from every device.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Revoking..."
              : "Revoke All Sessions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Impersonate User                                                          */
/* -------------------------------------------------------------------------- */

export function ImpersonateUserDialog({
  user,
  open,
  onOpenChange,
}: DialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    null
  )

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { error } =
        await authClient.admin.impersonateUser({
          userId: user.id,
        })

      if (error) {
        throw error
      }

      window.location.href = "/dashboard"
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to impersonate user."
        )
      )

      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Impersonate User?
          </DialogTitle>

          <DialogDescription>
            You will be signed in as{" "}
            <strong>
              {user?.email}
            </strong>{" "}
            and redirected to the dashboard.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Starting..."
              : "Impersonate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Ban User                                                                  */
/* -------------------------------------------------------------------------- */

export function BanUserDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: DialogProps) {
  const [days, setDays] = useState("7")
  const [reason, setReason] =
    useState("Admin action")

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    null
  )

  useEffect(() => {
    if (open) {
      setDays("7")
      setReason("Admin action")
      setError(null)
    }
  }, [open])

  const handleSubmit = async () => {
    if (!user) return

    const parsedDays = Number(days)

    if (
      !Number.isInteger(parsedDays) ||
      parsedDays <= 0
    ) {
      setError(
        "Enter a valid number of days."
      )
      return
    }

    setLoading(true)
    setError(null)

    try {
      const { error } =
        await authClient.admin.banUser({
          userId: user.id,
          banReason:
            reason || "Admin action",
          banExpiresIn:
            parsedDays *
            24 *
            60 *
            60,
        })

      if (error) {
        throw error
      }

      await onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to ban user."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Ban User?
          </DialogTitle>

          <DialogDescription>
            Temporarily prevent{" "}
            <strong>
              {user?.email}
            </strong>{" "}
            from signing in.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ban-days">
              Duration (days)
            </Label>

            <Input
              id="ban-days"
              type="number"
              min={1}
              value={days}
              onChange={(event) =>
                setDays(event.target.value)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="ban-reason">
              Reason
            </Label>

            <Textarea
              id="ban-reason"
              value={reason}
              onChange={(event) =>
                setReason(
                  event.target.value
                )
              }
              placeholder="Reason for ban"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Banning..."
              : "Ban User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Unban User                                                                */
/* -------------------------------------------------------------------------- */

export function UnbanUserDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: DialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    null
  )

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { error } =
        await authClient.admin.unbanUser({
          userId: user.id,
        })

      if (error) {
        throw error
      }

      await onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to unban user."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Unban User?
          </DialogTitle>

          <DialogDescription>
            This will restore{" "}
            <strong>
              {user?.email}
            </strong>{" "}
            and allow them to sign in again.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Unbanning..."
              : "Unban User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

/* -------------------------------------------------------------------------- */
/* Remove User                                                               */
/* -------------------------------------------------------------------------- */

export function RemoveUserDialog({
  user,
  open,
  onOpenChange,
  onSuccess,
}: DialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    null
  )

  const handleSubmit = async () => {
    if (!user) return

    setLoading(true)
    setError(null)

    try {
      const { error } =
        await authClient.admin.removeUser({
          userId: user.id,
        })

      if (error) {
        throw error
      }

      await onSuccess?.()
      onOpenChange(false)
    } catch (error) {
      setError(
        getErrorMessage(
          error,
          "Failed to remove user."
        )
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Remove User?
          </DialogTitle>

          <DialogDescription>
            This will permanently remove{" "}
            <strong>
              {user?.email}
            </strong>
            . This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {error && (
          <p className="text-sm text-destructive">
            {error}
          </p>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() =>
              onOpenChange(false)
            }
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading
              ? "Removing..."
              : "Remove User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}