"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { Mentor } from "@/lib/types";
import { Button } from "@/components/Button";

type Props = {
  mentor: Mentor;
};

export function FeedbackClient({ mentor }: Props) {
  const params = useSearchParams();
  const slot = params.get("slot") ?? "your session";
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <p className="text-sm font-semibold text-primary">Thank you</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
            You’ve returned {mentor.name}&apos;s time.
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
            In a full build, this step would store private feedback for program
            quality and optionally show social-proof snippets with consent.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/activity"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-95"
            >
              View My activity
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-muted"
            >
              Find another mentor
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <Link
        href={`/book/${mentor.id}/confirmed?slot=${encodeURIComponent(slot)}`}
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Back to confirmation
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-semibold text-primary">Post-session</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          How was your check-out?
        </h1>
        <p className="mt-2 text-sm text-foreground-muted">
          Session: <span className="font-medium text-foreground">{slot}</span>
        </p>

        <div className="mt-6">
          <div className="text-sm font-medium text-foreground">Rating</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {[5, 4, 3, 2, 1].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRating(r)}
                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                  rating === r
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-muted text-foreground hover:bg-muted"
                }`}
              >
                {r} stars
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium text-foreground">
            Private feedback (optional)
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={5}
            className="mt-2 w-full rounded-xl border border-border bg-card px-3 py-3 text-sm text-foreground shadow-sm outline-none ring-primary/30 placeholder:text-foreground-soft focus:ring-4"
            placeholder="What worked? What would you change?"
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button type="button" onClick={() => setSubmitted(true)}>
            Submit feedback
          </Button>
          <Link
            href="/activity"
            className="inline-flex items-center rounded-lg px-4 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-muted"
          >
            Skip
          </Link>
        </div>
      </div>
    </div>
  );
}
