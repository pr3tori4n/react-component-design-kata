import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { UserDashboard } from "../src/UserDashboard";

vi.mock("../src/api", () => ({
  getUsers: vi.fn(async () => [
    { id: "1", name: "Maya Chen", email: "maya@example.com", role: "admin", status: "active", department: "Engineering", lastActive: "2026-09-15" },
    { id: "2", name: "Jordan Smith", email: "jordan@example.com", role: "developer", status: "active", department: "Engineering", lastActive: "2026-09-14" },
    { id: "3", name: "Sam Rivera", email: "sam@example.com", role: "designer", status: "invited", department: "Design", lastActive: "—" }
  ]),
  updateUserStatus: vi.fn(async () => {})
}));

describe("UserDashboard behavior", () => {
  beforeEach(() => vi.clearAllMocks());

  it("loads and displays active users by default", async () => {
    render(<UserDashboard />);
    expect(screen.getByText("Loading users…")).toBeInTheDocument();

    await waitFor(() => expect(screen.getByText("Maya Chen")).toBeInTheDocument());
    expect(screen.getByText("Jordan Smith")).toBeInTheDocument();
    expect(screen.queryByText("Sam Rivera")).not.toBeInTheDocument();
  });

  it("filters by search", async () => {
    render(<UserDashboard />);
    await waitFor(() => screen.getByText("Maya Chen"));

    fireEvent.change(screen.getByLabelText("Search users"), {
      target: { value: "Jordan" }
    });

    expect(screen.queryByText("Maya Chen")).not.toBeInTheDocument();
    expect(screen.getByText("Jordan Smith")).toBeInTheDocument();
  });

  it("can show inactive users", async () => {
    render(<UserDashboard />);
    await waitFor(() => screen.getByText("Maya Chen"));

    fireEvent.click(screen.getByLabelText("Show inactive"));

    expect(screen.getByText("Sam Rivera")).toBeInTheDocument();
  });

  it("opens a user and can edit status", async () => {
    render(<UserDashboard />);
    await waitFor(() => screen.getByText("Maya Chen"));

    fireEvent.click(screen.getByText("Maya Chen"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Edit status"));
    fireEvent.change(screen.getByLabelText("Status"), { target: { value: "suspended" } });
    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => expect(screen.getByText("Status: suspended")).toBeInTheDocument());
  });
});