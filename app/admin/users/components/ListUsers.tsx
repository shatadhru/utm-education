"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"

import Actions, {
  type ActionType,
  type User,
} from "./Actions"

import {
  MakeAdminDialog,
  ResetPasswordDialog,
  UpdateUserDialog,
  ViewSessionsDialog,
  RevokeAllSessionsDialog,
  ImpersonateUserDialog,
  BanUserDialog,
  UnbanUserDialog,
  RemoveUserDialog,
} from "./UserDialogs"

const PAGE_SIZE = 10

type DialogState = {
  type: ActionType | null
  user: User | null
}

function ListUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)

  const [dialog, setDialog] = useState<DialogState>({
    type: null,
    user: null,
  })

  const getUsers = useCallback(async () => {
    setLoading(true)

    try {
      const { data, error } =
        await authClient.admin.listUsers({
          query: {
            limit: PAGE_SIZE,
            offset: (page - 1) * PAGE_SIZE,
            sortBy: "name",
            sortDirection: "asc",
          },
        })

      if (error) {
        console.error(
          "Failed to fetch users:",
          error
        )
        return
      }

      setUsers(data?.users ?? [])
      setTotal(data?.total ?? 0)
    } catch (error) {
      console.error(
        "Failed to fetch users:",
        error
      )
    } finally {
      setLoading(false)
    }
  }, [page])

  useEffect(() => {
    getUsers()
  }, [getUsers])

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase()

    if (!value) {
      return users
    }

    return users.filter(
      (user) =>
        user.name
          ?.toLowerCase()
          .includes(value) ||
        user.email
          ?.toLowerCase()
          .includes(value)
    )
  }, [users, search])

  const totalPages = Math.ceil(
    total / PAGE_SIZE
  )

  const nextPage = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
      setSearch("")
    }
  }

  const previousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
      setSearch("")
    }
  }

  /*
   * Open any user action dialog.
   */
  const openDialog = (
    type: ActionType,
    user: User
  ) => {
    setDialog({
      type,
      user,
    })
  }

  /*
   * Close current dialog.
   */
  const closeDialog = () => {
    setDialog({
      type: null,
      user: null,
    })
  }

  return (
    <div className="mt-4 space-y-4">
      <Input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="Search users on this page..."
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">
              Status
            </TableHead>
            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center"
              >
                Loading users...
              </TableCell>
            </TableRow>
          ) : filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center"
              >
                No users found
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                  {user.name ?? "Unnamed user"}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  {user.role}
                </TableCell>

                <TableCell className="text-right">
                  {user.banned
                    ? "Banned"
                    : "Active"}
                </TableCell>

                <TableCell className="text-right">
                  <Actions
                    user={user}
                    onAction={openDialog}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Pagination */}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of{" "}
          {totalPages || 1}
        </p>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={previousPage}
            disabled={
              page === 1 || loading
            }
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={nextPage}
            disabled={
              page >= totalPages ||
              loading
            }
          >
            Next
          </Button>
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Dialogs                                                      */}
      {/* ------------------------------------------------------------ */}

      <MakeAdminDialog
        user={dialog.user}
        open={
          dialog.type === "makeAdmin"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
        onSuccess={getUsers}
      />

      <ResetPasswordDialog
        user={dialog.user}
        open={
          dialog.type === "resetPassword"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
        onSuccess={getUsers}
      />

      <UpdateUserDialog
        user={dialog.user}
        open={
          dialog.type === "updateUser"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
        onSuccess={getUsers}
      />

      <ViewSessionsDialog
        user={dialog.user}
        open={
          dialog.type === "viewSessions"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
      />

      <RevokeAllSessionsDialog
        user={dialog.user}
        open={
          dialog.type ===
          "revokeAllSessions"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
        onSuccess={getUsers}
      />

      <ImpersonateUserDialog
        user={dialog.user}
        open={
          dialog.type ===
          "impersonate"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
      />

      <BanUserDialog
        user={dialog.user}
        open={
          dialog.type === "ban"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
        onSuccess={getUsers}
      />

      <UnbanUserDialog
        user={dialog.user}
        open={
          dialog.type === "unban"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
        onSuccess={getUsers}
      />

      <RemoveUserDialog
        user={dialog.user}
        open={
          dialog.type === "remove"
        }
        onOpenChange={(open) => {
          if (!open) {
            closeDialog()
          }
        }}
        onSuccess={getUsers}
      />
    </div>
  )
}

export default ListUsers