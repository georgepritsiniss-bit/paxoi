import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { format } from "date-fns";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const supabase = createSupabaseAdminClient();
  const { data: msgs } = await supabase
    .from("contact_messages")
    .select("*, villa:villas(name, slug)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl text-ink-900">Messages</h1>
      <p className="mt-2 text-sm text-ink-500">
        Inbox from the contact and villa enquiry forms.
      </p>

      <div className="mt-8 space-y-3">
        {(msgs || []).map(
          (m: {
            id: string;
            name: string;
            email: string;
            phone: string | null;
            message: string;
            created_at: string;
            villa: { name: string; slug: string } | null;
          }) => (
            <div
              key={m.id}
              className="rounded-2xl border border-ink-900/5 bg-white p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-ink-900">{m.name}</div>
                  <div className="text-xs text-ink-500">
                    <a className="hover:underline" href={`mailto:${m.email}`}>
                      {m.email}
                    </a>
                    {m.phone && <span> · {m.phone}</span>}
                  </div>
                </div>
                <div className="text-right text-xs text-ink-400">
                  {format(new Date(m.created_at), "PPP, p")}
                  {m.villa && (
                    <div className="mt-1 rounded-full bg-sand-100 px-2 py-0.5 text-sand-700">
                      {m.villa.name}
                    </div>
                  )}
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line text-sm text-ink-700">
                {m.message}
              </p>
            </div>
          )
        )}
        {(!msgs || msgs.length === 0) && (
          <div className="grid place-items-center rounded-2xl border border-dashed border-ink-200 p-12 text-center text-sm text-ink-400">
            No messages yet.
          </div>
        )}
      </div>
    </div>
  );
}
