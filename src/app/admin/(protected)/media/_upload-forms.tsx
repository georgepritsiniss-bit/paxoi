"use client";

import { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
  AlertCircle,
  CheckCircle2,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Plus,
} from "lucide-react";
import {
  addMediaUrl,
  uploadMediaFile,
  type MediaActionState,
} from "../../actions";

const initialState: MediaActionState = { error: null, ok: false };

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary mt-4 w-full">
      {pending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
      {label}
    </button>
  );
}

function StateBanner({ state }: { state: MediaActionState }) {
  if (state.ok) {
    return (
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-emerald-50 px-3 py-2 text-xs text-emerald-700">
        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        Added to the library.
      </div>
    );
  }
  if (state.error) {
    return (
      <div className="mt-3 flex items-start gap-2 rounded-xl bg-red-50 px-3 py-2 text-xs text-red-700">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span className="whitespace-pre-wrap break-words">{state.error}</span>
      </div>
    );
  }
  return null;
}

export function UploadFileForm() {
  const [state, action] = useFormState(uploadMediaFile, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-2xl border border-ink-900/5 bg-white p-5"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
        <ImageIcon className="h-4 w-4" />
        Upload a file
      </div>
      <p className="mt-1 text-xs text-ink-500">
        Saved to Supabase Storage under{" "}
        <code className="rounded bg-sand-100 px-1">
          villa-images/media/
        </code>
        .
      </p>
      <input
        type="file"
        name="file"
        accept="image/*"
        required
        className="mt-4 block w-full text-sm text-ink-700 file:mr-3 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink-900 file:px-4 file:py-2 file:text-xs file:text-sand-50 hover:file:bg-ink-700"
      />
      <input
        name="alt"
        placeholder="Alt text (optional)"
        className="input mt-3"
      />
      <SubmitButton label="Upload" />
      <StateBanner state={state} />
    </form>
  );
}

export function AddUrlForm() {
  const [state, action] = useFormState(addMediaUrl, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.ok) formRef.current?.reset();
  }, [state.ok]);

  return (
    <form
      ref={formRef}
      action={action}
      className="rounded-2xl border border-ink-900/5 bg-white p-5"
    >
      <div className="flex items-center gap-2 text-sm font-medium text-ink-900">
        <LinkIcon className="h-4 w-4" />
        Add by URL
      </div>
      <p className="mt-1 text-xs text-ink-500">
        Useful for Unsplash or your own CDN. We&apos;ll just save the URL.
      </p>
      <input
        name="url"
        required
        placeholder="https://..."
        className="input mt-4"
      />
      <input
        name="alt"
        placeholder="Alt text (optional)"
        className="input mt-3"
      />
      <SubmitButton label="Add to library" />
      <StateBanner state={state} />
    </form>
  );
}
