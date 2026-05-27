import { redirect } from "next/navigation";
import { isAdminFromCookies } from "@/lib/admin-auth";
import { logoutAdmin } from "../actions";
import AdminShell from "./_shell";

export const dynamic = "force-dynamic";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAdminFromCookies()) redirect("/admin/login");

  return <AdminShell logoutAction={logoutAdmin}>{children}</AdminShell>;
}
