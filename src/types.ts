export type UserStatus = "active" | "invited" | "suspended";
export type Role = "admin" | "manager" | "developer" | "designer";

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  department: string;
  lastActive: string;
};