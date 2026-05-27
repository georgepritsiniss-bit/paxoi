"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Home,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  PlusCircle,
  Sparkles,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/villas", label: "Villas", icon: Home },
  { href: "/admin/villas/new", label: "New villa", icon: PlusCircle },
  { href: "/admin/content", label: "Site content", icon: Sparkles },
  { href: "/admin/media", label: "Media library", icon: ImageIcon },
  { href: "/admin/messages", label: "Messages", icon: MessageSquare },
];

function NavList({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-1 px-3">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(item.href + "/");
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition-colors",
              active
                ? "bg-ink-900 text-sand-50"
                : "text-ink-700 hover:bg-ink-900/5"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default function AdminShell({
  children,
  logoutAction,
}: {
  children: React.ReactNode;
  logoutAction: () => Promise<void> | void;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close the drawer when the route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll while drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen bg-sand-50">
      {/* Desktop sidebar */}
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
        <NavList pathname={pathname} />
        <div className="border-t border-ink-900/5 p-3">
          <form action={logoutAction}>
            <button className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-sm text-ink-600 transition-colors hover:bg-ink-900/5">
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

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-ink-900/5 bg-white/85 px-4 py-3 backdrop-blur md:hidden">
          <Link
            href="/admin"
            className="font-serif text-xl tracking-tight text-ink-900"
          >
            Paxoi<span className="text-sand-500">.</span>{" "}
            <span className="text-[10px] text-ink-400">admin</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5"
          >
            <Menu className="h-5 w-5" />
          </button>
        </header>

        <div className="container-px mx-auto w-full max-w-6xl py-6 md:py-10">
          {children}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              aria-hidden
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-ink-900/5 bg-white"
            >
              <div className="flex items-center justify-between px-5 py-5">
                <Link
                  href="/admin"
                  className="font-serif text-xl tracking-tight text-ink-900"
                >
                  Paxoi<span className="text-sand-500">.</span>{" "}
                  <span className="text-[10px] text-ink-400">admin</span>
                </Link>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <NavList
                pathname={pathname}
                onNavigate={() => setMobileOpen(false)}
              />
              <div className="border-t border-ink-900/5 p-3">
                <form action={logoutAction}>
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
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
