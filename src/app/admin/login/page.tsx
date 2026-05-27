import Link from "next/link";
import { redirect } from "next/navigation";
import { Shield } from "lucide-react";
import { isAdminFromCookies } from "@/lib/admin-auth";
import AdminLoginForm from "./_form";

export const metadata = { title: "Admin sign in" };
export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  if (isAdminFromCookies()) redirect("/admin");
  return (
    <div className="min-h-screen bg-ink-900">
      <div className="container-px mx-auto grid min-h-screen max-w-md place-items-center py-16">
        <div className="w-full">
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-sand-50"
          >
            Paxoi<span className="text-sand-400">.</span>
          </Link>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-sand-400/15 text-sand-300">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <h1 className="font-serif text-2xl text-white">Admin sign in</h1>
                <p className="text-xs text-sand-200/60">
                  Restricted area. Default: root / root
                </p>
              </div>
            </div>

            <div className="mt-8">
              <AdminLoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
