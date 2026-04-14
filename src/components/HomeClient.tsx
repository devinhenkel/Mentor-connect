"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Genre, Mentor } from "@/lib/types";
import { searchMentors } from "@/lib/data";
import { MentorCard } from "@/components/MentorCard";
import { ButtonLink } from "@/components/Button";

type Props = {
  genres: Genre[];
  allMentors: Mentor[];
};

export function HomeClient({ genres, allMentors }: Props) {
  const [mode, setMode] = useState<"themes" | "search">("themes");
  const [q, setQ] = useState("");

  const results = useMemo(() => searchMentors(q), [q]);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold text-primary">LCP Mentor Connector</p>
        <h1 className="mt-2 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Find a mentor by theme—or search the marketplace.
        </h1>
        <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-foreground-muted">
          This prototype simulates discovery, profiles, and a playful
          &ldquo;check-out&rdquo; flow. Use it to align on language, navigation,
          and what belongs in v1.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setMode("themes")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "themes"
                ? "bg-primary text-primary-foreground"
                : "bg-surface-muted text-foreground hover:bg-muted"
            }`}
          >
            Browse by theme
          </button>
          <button
            type="button"
            onClick={() => setMode("search")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              mode === "search"
                ? "bg-primary text-primary-foreground"
                : "bg-surface-muted text-foreground hover:bg-muted"
            }`}
          >
            Search first
          </button>
        </div>
      </section>

      {mode === "search" ? (
        <section className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-foreground">
              What do you want to get better at?
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder='Try "pricing", "renewal", "psychological safety"...'
              className="mt-2 w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground shadow-sm outline-none ring-primary/30 placeholder:text-foreground-soft focus:ring-4"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            {results.length ? (
              results.map((m) => (
                <MentorCard key={m.id} mentor={m} genres={genres} />
              ))
            ) : (
              <p className="text-sm text-foreground-muted">
                No mentors match that query in the prototype dataset.
              </p>
            )}
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Themes (genres)
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">
                Pick a growth area—mentors are curated into each theme.
              </p>
            </div>
            <ButtonLink href="/forum" variant="secondary">
              Jump to forum
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {genres.map((g) => {
              const count = allMentors.filter((m) =>
                m.genreIds.includes(g.id),
              ).length;
              return (
                <Link
                  key={g.id}
                  href={`/genres/${g.slug}`}
                  className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
                    {g.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
                    {g.description}
                  </p>
                  <p className="mt-4 text-xs font-medium text-foreground-soft">
                    {count} mentor{count === 1 ? "" : "s"} in prototype
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-6">
        <h2 className="text-base font-semibold text-foreground">
          Facilitator note
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
          Toggle &ldquo;Browse by theme&rdquo; vs &ldquo;Search first&rdquo; in
          usability sessions. Both map to the same underlying mentor dataset.
        </p>
      </section>
    </div>
  );
}
