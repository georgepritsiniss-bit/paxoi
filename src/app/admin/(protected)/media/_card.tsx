"use client";

import Image from "next/image";
import { useState } from "react";
import { Check, Copy, Trash2 } from "lucide-react";
import { deleteMediaItem } from "../../actions";
import type { MediaItem } from "@/types";

export default function MediaCard({ item }: { item: MediaItem }) {
  const [copied, setCopied] = useState(false);

  async function copyUrl() {
    try {
      await navigator.clipboard.writeText(item.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable; ignore
    }
  }

  return (
    <div className="group overflow-hidden rounded-2xl border border-ink-900/5 bg-white transition-all hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative aspect-[4/3] bg-ink-100">
        <Image
          src={item.url}
          alt={item.alt || ""}
          fill
          sizes="(min-width:1024px) 25vw, 50vw"
          className="object-cover"
          unoptimized={item.url.startsWith("http") && !item.storage_path}
        />
        {item.storage_path && (
          <span className="absolute left-2 top-2 rounded-full bg-emerald-50/95 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald-700 backdrop-blur">
            uploaded
          </span>
        )}
      </div>
      <div className="space-y-2 p-3">
        <div className="truncate text-xs text-ink-500" title={item.url}>
          {item.url}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyUrl}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs text-ink-900 transition-colors hover:bg-ink-900/10"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" /> Copied
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" /> Copy URL
              </>
            )}
          </button>
          <form action={deleteMediaItem.bind(null, item.id)}>
            <button
              type="submit"
              aria-label="Delete media item"
              className="inline-flex items-center justify-center rounded-full border border-ink-200 p-2 text-ink-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
