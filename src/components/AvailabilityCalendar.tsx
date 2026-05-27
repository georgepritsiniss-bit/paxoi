"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  endOfMonth,
  format,
  isBefore,
  isSameDay,
  startOfMonth,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  parseISO,
  addDays,
} from "date-fns";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { UnavailableDate } from "@/types";
import { cn } from "@/lib/utils";

export default function AvailabilityCalendar({
  unavailable,
}: {
  unavailable: UnavailableDate[];
}) {
  const { t } = useLanguage();
  const [cursor, setCursor] = useState(startOfMonth(new Date()));

  const ranges = useMemo(
    () =>
      unavailable.map((u) => ({
        start: parseISO(u.start_date),
        end: parseISO(u.end_date),
      })),
    [unavailable]
  );

  function isUnavailable(d: Date) {
    return ranges.some((r) =>
      isWithinInterval(d, { start: r.start, end: r.end })
    );
  }

  const monthDays = useMemo(() => {
    const start = startOfWeek(startOfMonth(cursor), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(cursor), { weekStartsOn: 1 });
    const days: Date[] = [];
    let d = start;
    while (isBefore(d, end) || isSameDay(d, end)) {
      days.push(d);
      d = addDays(d, 1);
    }
    return days;
  }, [cursor]);

  const today = new Date();
  const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  return (
    <div className="rounded-3xl border border-ink-900/5 bg-white p-5 md:p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-xl font-light text-ink-900">
          {t.detail.calendar}
        </h3>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor((c) => addMonths(c, -1))}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5"
            aria-label="Previous month"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="w-36 text-center text-sm font-medium text-ink-900">
            {format(cursor, "LLLL yyyy")}
          </div>
          <button
            type="button"
            onClick={() => setCursor((c) => addMonths(c, 1))}
            className="grid h-9 w-9 place-items-center rounded-full text-ink-700 hover:bg-ink-900/5"
            aria-label="Next month"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-wider text-ink-400">
        {weekDays.map((d) => (
          <div key={d} className="py-1">
            {d}
          </div>
        ))}
      </div>

      <motion.div
        key={cursor.toISOString()}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mt-1 grid grid-cols-7 gap-1"
      >
        {monthDays.map((d) => {
          const outside = d.getMonth() !== cursor.getMonth();
          const past = isBefore(d, today) && !isSameDay(d, today);
          const unav = isUnavailable(d);
          return (
            <div
              key={d.toISOString()}
              className={cn(
                "relative grid aspect-square place-items-center rounded-lg text-sm",
                outside && "text-ink-300",
                !outside && !unav && !past && "text-ink-900",
                past && "text-ink-300 line-through",
                unav && !past && "bg-red-50 text-red-700",
                !unav && !past && !outside && "hover:bg-ink-900/5"
              )}
              title={unav ? t.detail.booked : t.detail.available}
            >
              {format(d, "d")}
              {isSameDay(d, today) && (
                <span className="absolute bottom-1 h-1 w-1 rounded-full bg-ink-900" />
              )}
            </div>
          );
        })}
      </motion.div>

      <div className="mt-5 flex items-center gap-4 text-xs text-ink-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-red-50 ring-1 ring-red-200" />
          {t.detail.booked}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-3 w-3 rounded bg-ink-900/5 ring-1 ring-ink-900/10" />
          {t.detail.available}
        </span>
      </div>
    </div>
  );
}
