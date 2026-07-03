import { useCallback, useEffect, useState } from "react";

export type UserRole = "participant" | "admin";

export type PortalUser = {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
};

const defaultUsers: PortalUser[] = [
  {
    id: "admin-1",
    name: "Admin User",
    email: "admin@yuva.com",
    password: "admin",
    role: "admin",
  },
];

const usersStorageKey = "yuva-2026-users";
const sessionStorageKey = "yuva-2026-session";

function getStoredUsers(): PortalUser[] {
  if (typeof window === "undefined") return defaultUsers;
  try {
    const stored = window.localStorage.getItem(usersStorageKey);
    if (!stored) return defaultUsers;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : defaultUsers;
  } catch {
    return defaultUsers;
  }
}

function setStoredUsers(users: PortalUser[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(usersStorageKey, JSON.stringify(users));
}

export function getCurrentUser(): PortalUser | null {
  if (typeof window === "undefined") return null;
  const email = window.localStorage.getItem(sessionStorageKey);
  if (!email) return null;
  return getStoredUsers().find((u) => u.email === email) || null;
}

export function login(email: string, password?: string) {
  const normalized = email.trim().toLowerCase();
  const users = getStoredUsers();
  const user = users.find((u) => u.email === normalized);
  if (!user) {
    return { ok: false, message: "User not found." };
  }
  if (user.password && user.password !== password) {
    return { ok: false, message: "Invalid credentials." };
  }
  window.localStorage.setItem(sessionStorageKey, user.email);
  window.dispatchEvent(new Event("yuva-auth-change"));
  return { ok: true, user };
}

export function registerUser(name: string, email: string, password?: string) {
  const normalized = email.trim().toLowerCase();
  const users = getStoredUsers();
  if (users.find((u) => u.email === normalized)) {
    return { ok: false, message: "User already exists." };
  }
  const user: PortalUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: normalized,
    password,
    role: "participant",
  };
  setStoredUsers([...users, user]);
  window.localStorage.setItem(sessionStorageKey, user.email);
  window.dispatchEvent(new Event("yuva-auth-change"));
  return { ok: true, user };
}

export function logout() {
  window.localStorage.removeItem(sessionStorageKey);
  window.dispatchEvent(new Event("yuva-auth-change"));
}

export function updateUserRole(id: string, role: UserRole) {
  const users = getStoredUsers().map((user) => (user.id === id ? { ...user, role } : user));
  setStoredUsers(users);
}

export function deleteUser(id: string) {
  const current = getCurrentUser();
  const users = getStoredUsers().filter((user) => user.id !== id);
  setStoredUsers(users);
  if (current?.id === id) logout();
}

export function useAuth() {
  const [user, setUser] = useState<PortalUser | null>(getCurrentUser);
  const [users, setUsers] = useState<PortalUser[]>(() => {
    if (typeof window === "undefined") return defaultUsers;
    const stored = window.localStorage.getItem(usersStorageKey);
    if (!stored) return defaultUsers;
    try {
      const parsed = JSON.parse(stored) as PortalUser[];
      return Array.isArray(parsed) ? parsed : defaultUsers;
    } catch {
      return defaultUsers;
    }
  });

  const refresh = useCallback(() => {
    setUsers(getStoredUsers());
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("yuva-auth-change", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("yuva-auth-change", refresh);
    };
  }, [refresh]);

  return {
    user,
    users,
    isAdmin: user?.role === "admin",
    isParticipant: user?.role === "participant" || user?.role === "admin",
    loading: false, // add loading to match old API just in case
    refresh,
  };
}
