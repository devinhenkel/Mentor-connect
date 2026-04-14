"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { EventItem, ForumThread, Genre, Mentor } from "@/lib/types";
import { MentorCard } from "@/components/MentorCard";
import { ButtonLink } from "@/components/Button";

type Props = {
  genre: Genre;
  mentors: Mentor[];
  allGenres: Genre[];
  tags: string[];
  threads: ForumThread[];
  upcoming: EventItem[];
};

export function GenrePageClient({
  genre,
  mentors,
  allGenres,
  tags,
  threads,
  upcoming,
}: Props) {
  const [activeTags, setActiveTags] = useState<string[]>([]);

  const filtered = useMemo(() => {
    if (!activeTags.length) return mentors;
    return mentors.filter((m) => activeTags.every((t) => m.tags.includes(t)));
  }, [mentors, activeTags]);

  function toggleTag(tag: string) {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-3">
        <Link
          href="/"
          className="text-sm font-semibold text-primary hover:underline"
        >
          ← All themes
        </Link>
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          {genre.title}
        </h1>
        <p className="max-w-3xl text-pretty text-base leading-relaxed text-zinc-600">
          {genre.description}
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-sm font-semibold text-zinc-900">Spotlight tags</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {genre.highlightTags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900">Mentors</h2>
            <p className="mt-1 text-sm text-zinc-600">
              Filter by tags that appear in this theme.
            </p>
          </div>
          <ButtonLink href="/events" variant="secondary">
            See events
          </ButtonLink>
        </div>

        {tags.length ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const active = activeTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-surface-muted text-zinc-800 hover:bg-zinc-200"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {activeTags.length ? (
              <button
                type="button"
                onClick={() => setActiveTags([])}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-zinc-700 underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((m) => (
            <MentorCard
              key={m.id}
              mentor={m}
              genres={allGenres}
              genreContextId={genre.id}
            />
          ))}
        </div>
        {!filtered.length ? (
          <p className="text-sm text-zinc-600">
            No mentors match those filters in this theme.
          </p>
        ) : null}
      </section>

      {threads.length ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">
            Related forum threads
          </h2>
          <div className="divide-y divide-border rounded-2xl border border-border bg-white shadow-sm">
            {threads.map((t) => (
              <Link
                key={t.id}
                href={`/forum/${t.id}`}
                className="block px-5 py-4 transition hover:bg-surface-muted"
              >
                <div className="text-sm font-semibold text-zinc-900">
                  {t.title}
                </div>
                <div className="mt-1 text-sm text-zinc-600">{t.excerpt}</div>
                <div className="mt-2 text-xs text-zinc-500">
                  {t.replyCount} replies · {t.lastActivity}
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {upcoming.length ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-zinc-900">
            Upcoming in this theme
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            {upcoming.map((e) => (
              <div
                key={e.id}
                className="rounded-2xl border border-border bg-white p-5 shadow-sm"
              >
                <div className="text-sm font-semibold text-zinc-900">
                  {e.title}
                </div>
                <div className="mt-1 text-xs text-zinc-500">{e.startsAt}</div>
                <div className="mt-2 text-sm text-zinc-600">{e.description}</div>
                <div className="mt-3 text-xs font-medium text-zinc-500">
                  Host: {e.host}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
