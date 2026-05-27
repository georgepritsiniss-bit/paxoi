"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import { loginAdmin } from "../actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-sand-100 px-5 py-3 text-sm font-medium text-ink-900 transition-all hover:-translate-y-0.5 hover:bg-white"
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      Sign in
    </button>
  );
}

export default function AdminLoginForm() {
  const [state, action] = useFormState(loginAdmin, { error: null } as {
    error: string | null;
  });

  return (
    <form action={action} className="space-y-4">
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-sand-200/70">
          Username
        </label>
        <input
          name="username"
          required
          autoComplete="username"
          defaultValue="root"
          className="w-full rounded-xl border border-white/10 bg-ink-900/40 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-sand-400"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-xs uppercase tracking-wider text-sand-200/70">
          Password
        </label>
        <input
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="w-full rounded-xl border border-white/10 bg-ink-900/40 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-sand-400"
        />
      </div>
      {state?.error && (
        <p className="text-sm text-red-300">{state.error}</p>
      )}
      <SubmitButton />
    </form>
  );
}
