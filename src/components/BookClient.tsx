"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Mentor } from "@/lib/types";
import { Button } from "@/components/Button";

type Props = {
  mentor: Mentor;
};

const SLOTS = [
  "Mon · 9:00 AM · 30 min",
  "Mon · 2:30 PM · 30 min",
  "Wed · 11:00 AM · 45 min",
  "Thu · 4:00 PM · 30 min",
  "Fri · 8:30 AM · 30 min",
];

export function BookClient({ mentor }: Props) {
  const router = useRouter();
  const [slot, setSlot] = useState<string>(SLOTS[0] ?? "");
  const [pending, setPending] = useState(false);

  const mentorInitials = useMemo(() => {
    return mentor.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .slice(0, 2);
  }, [mentor.name]);

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <Link
        href={`/mentors/${mentor.id}`}
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Back to profile
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-semibold text-primary">Check out a mentor</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          Book time with {mentor.name}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          Prototype only: this won’t send calendar invites. The goal is to
          validate copy, steps, and expectations.
        </p>

        <div className="mt-6 flex items-start gap-4">
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-foreground-muted"
            aria-hidden
          >
            {mentorInitials}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              {mentor.name}
            </div>
            <div className="text-sm text-foreground-muted">{mentor.title}</div>
            <div className="mt-2 text-xs text-foreground-soft">
              {mentor.availabilitySummary}
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-foreground">
            Choose a time
          </label>
          <select
            className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-3 text-sm text-foreground shadow-sm outline-none ring-primary/30 focus:ring-4"
            value={slot}
            onChange={(e) => setSlot(e.target.value)}
          >
            {SLOTS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface-muted/60 p-4 text-sm text-foreground-muted">
          <div className="font-semibold text-foreground">What happens next?</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>You’ll get a confirmation screen with playful “library” copy.</li>
            <li>In real life: Teams invite + optional pre-chat.</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button
            type="button"
            disabled={pending}
            onClick={() => {
              setPending(true);
              router.push(
                `/book/${mentor.id}/confirmed?slot=${encodeURIComponent(slot)}`,
              );
            }}
          >
            Confirm check-out
          </Button>
          <Link
            href={`/mentors/${mentor.id}`}
            className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-muted"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
