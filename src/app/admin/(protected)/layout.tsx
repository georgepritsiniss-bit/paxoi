import Link from "next/link";
import { redirect } from "next/navigation";
import {
  LayoutDashboard,
  Home,
  LogOut,
  PlusCircle,
  MessageSquare,
} from "lucide-react";
import { isAdminFromCookies } from "@/lib/admin-auth";
import { logoutAdmin } from "../actions";

export const dynamic = "force-dynamic";

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAdminFromCookies()) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-sand-50">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-900/10 bg-white md:flex">
        <div className="px-6 py-6">
          <Link
            href="/admin"
            className="font-serif text-2xl tracking-tight text-ink-900"
          >
            Paxoi<span className="text-sand-500">.</span>{" "}
            <span className="text-xs text-ink-400">admin</span>
          </Link>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          <NavItem href="/admin" icon={<LayoutDashboard className="h-4 w-4" />}>
            Dashboard
          </NavItem>
          <NavItem href="/admin/villas" icon={<Home className="h-4 w-4" />}>
            Villas
          </NavItem>
          <NavItem
            href="/admin/villas/new"
            icon={<PlusCircle className="h-4 w-4" />}
          >
            New villa
          </NavItem>
          <NavItem
            href="/admin/messages"
            icon={<MessageSquare className="h-4 w-4" />}
          >
            Messages
          </NavItem>
        </nav>
        <div className="border-t border-ink-900/5 p-3">
          <form action={logoutAdmin}>
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-600 hover:bg-ink-900/5">
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
          <Link
            href="/"
            className="mt-1 block rounded-xl px-3 py-2 text-xs text-ink-400 hover:bg-ink-900/5"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      <div className="flex-1">
        <div className="container-px mx-auto max-w-6xl py-10">{children}</div>
      </div>
    </div>
  );
}

function NavItem({
  href,
  icon,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-700 transition-colors hover:bg-ink-900/5"
    >
      {icon}
      {children}
    </Link>
  );
}
