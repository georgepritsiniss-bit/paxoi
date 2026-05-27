import { Suspense } from "react";
import AuthForm from "../_auth/AuthForm";

export const metadata = { title: "Sign in" };
export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container-px mx-auto max-w-7xl py-24" />}>
      <AuthForm mode="login" />
    </Suspense>
  );
}
