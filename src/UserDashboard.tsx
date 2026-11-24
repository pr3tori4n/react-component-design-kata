import { useEffect, useMemo, useState } from "react";
import { getUsers, updateUserStatus } from "./api";
import type { Role, User } from "./types";

export function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<Role | "all">("all");
  const [showInactive, setShowInactive] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editing, setEditing] = useState(false);
  const [editStatus, setEditStatus] = useState<User["status"]>("active");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUsers()
      .then((result) => {
        setUsers(result);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load users.");
        setLoading(false);
      });
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());

      const matchesRole = role === "all" || user.role === role;
      const matchesStatus = showInactive || user.status === "active";

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, role, showInactive]);

  async function saveStatus() {
    if (!selectedUser) return;

    try {
      await updateUserStatus(selectedUser.id, editStatus);
      const updated = users.map((user) =>
        user.id === selectedUser.id ? { ...user, status: editStatus } : user
      );
      setUsers(updated);
      setSelectedUser({ ...selectedUser, status: editStatus });
      setEditing(false);
    } catch {
      setError("Unable to update user.");
    }
  }

  function openUser(user: User) {
    setSelectedUser(user);
    setEditStatus(user.status);
    setEditing(false);
  }

  const activeCount = users.filter((u) => u.status === "active").length;
  const inactiveCount = users.length - activeCount;

  return (
    <main style={{ fontFamily: "sans-serif", maxWidth: 900, margin: "40px auto", padding: 20 }}>
      <header>
        <h1>User Administration</h1>
        <p>{activeCount} active · {inactiveCount} inactive</p>
      </header>

      {error && <div role="alert">{error}</div>}

      <section aria-label="Filters" style={{ display: "flex", gap: 12, margin: "24px 0" }}>
        <input
          aria-label="Search users"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select aria-label="Role" value={role} onChange={(e) => setRole(e.target.value as Role | "all")}>
          <option value="all">All roles</option>
          <option value="admin">Admin</option>
          <option value="manager">Manager</option>
          <option value="developer">Developer</option>
          <option value="designer">Designer</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
          />
          Show inactive
        </label>
      </section>

      {loading ? (
        <p>Loading users…</p>
      ) : (
        <section aria-label="Users">
          {filteredUsers.length === 0 ? (
            <p>No users match the current filters.</p>
          ) : (
            filteredUsers.map((user) => (
              <article
                key={user.id}
                style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8, cursor: "pointer" }}
                onClick={() => openUser(user)}
              >
                <strong>{user.name}</strong>
                <div>{user.email}</div>
                <div>{user.role} · {user.status} · {user.department}</div>
              </article>
            ))
          )}
        </section>
      )}

      {selectedUser && (
        <div role="dialog" aria-label="User details" style={{ border: "2px solid #333", padding: 20, marginTop: 24 }}>
          <button onClick={() => setSelectedUser(null)}>Close</button>
          <h2>{selectedUser.name}</h2>
          <p>{selectedUser.email}</p>
          <p>Department: {selectedUser.department}</p>
          <p>Role: {selectedUser.role}</p>

          {!editing ? (
            <>
              <p>Status: {selectedUser.status}</p>
              <button onClick={() => setEditing(true)}>Edit status</button>
            </>
          ) : (
            <>
              <label>
                Status{" "}
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as User["status"])}
                >
                  <option value="active">Active</option>
                  <option value="invited">Invited</option>
                  <option value="suspended">Suspended</option>
                </select>
              </label>
              <button onClick={saveStatus}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </>
          )}
        </div>
      )}
    </main>
  );
}