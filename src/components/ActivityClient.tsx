"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { BookedSession } from "@/lib/sessions";
import { loadSessions } from "@/lib/sessions";

export function ActivityClient() {
  const [sessions, setSessions] = useState<BookedSession[]>([]);

  useEffect(() => {
    setSessions(loadSessions());
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          My activity
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
          Booked sessions are stored locally in your browser for this prototype.
        </p>
      </div>

      {sessions.length ? (
        <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-sm">
          {sessions.map((s) => (
            <div key={s.id} className="px-5 py-4">
              <div className="text-sm font-semibold text-foreground">
                Checked out: {s.mentorName}
              </div>
              <div className="mt-1 text-sm text-foreground-muted">{s.slotLabel}</div>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <Link
                  href={`/mentors/${s.mentorId}`}
                  className="font-semibold text-primary hover:underline"
                >
                  View mentor
                </Link>
                <Link
                  href={`/feedback/${s.mentorId}?slot=${encodeURIComponent(s.slotLabel)}`}
                  className="font-semibold text-foreground-muted hover:underline"
                >
                  Leave feedback
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6 text-sm text-foreground-muted shadow-sm">
          No sessions yet. Book a mentor from any profile to see it here.
        </div>
      )}
    </div>
  );
}
