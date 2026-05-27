import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import VillaForm from "../_form";
import { createVilla } from "../../../actions";

export const dynamic = "force-dynamic";

export default function NewVillaPage() {
  return (
    <div>
      <Link
        href="/admin/villas"
        className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to villas
      </Link>
      <h1 className="mt-4 font-serif text-3xl text-ink-900">New villa</h1>
      <p className="mt-2 text-sm text-ink-500">
        Create the villa first, then add gallery images on the edit page.
      </p>

      <div className="mt-8 rounded-2xl border border-ink-900/5 bg-white p-6 md:p-8">
        <VillaForm action={createVilla} submitLabel="Create villa" />
      </div>
    </div>
  );
}
