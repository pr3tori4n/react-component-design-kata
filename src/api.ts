import type { User } from "./types";

const users: User[] = [
  { id: "1", name: "Maya Chen", email: "maya@example.com", role: "admin", status: "active", department: "Engineering", lastActive: "2026-09-15" },
  { id: "2", name: "Jordan Smith", email: "jordan@example.com", role: "developer", status: "active", department: "Engineering", lastActive: "2026-09-14" },
  { id: "3", name: "Priya Patel", email: "priya@example.com", role: "manager", status: "active", department: "Product", lastActive: "2026-09-12" },
  { id: "4", name: "Sam Rivera", email: "sam@example.com", role: "designer", status: "invited", department: "Design", lastActive: "—" },
  { id: "5", name: "Alex Johnson", email: "alex@example.com", role: "developer", status: "suspended", department: "Engineering", lastActive: "2026-08-30" },
  { id: "6", name: "Taylor Kim", email: "taylor@example.com", role: "developer", status: "active", department: "Engineering", lastActive: "2026-09-15" }
];

export async function getUsers(): Promise<User[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return users;
}

export async function updateUserStatus(id: string, status: User["status"]) {
  await new Promise((resolve) => setTimeout(resolve, 50));
  const user = users.find((u) => u.id === id);
  if (user) user.status = status;
}