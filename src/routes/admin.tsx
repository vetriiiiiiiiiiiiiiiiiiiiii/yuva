import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { getCurrentUser, useAuth } from "../components/yuva/auth-store";
import { AdminDashboard } from "../components/yuva/AdminDashboard";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getCurrentUser();
    if (storedUser?.role !== "admin") navigate({ to: "/" });
  }, [navigate]);

  if (!isAdmin) {
    return null;
  }

  return <AdminDashboard />;
}
