import Link from "next/link";
import type { Genre, Mentor } from "@/lib/types";

type Props = {
  mentor: Mentor;
  genres: Genre[];
  genreContextId?: string;
};

export function MentorCard({ mentor, genres, genreContextId }: Props) {
  const primary = genres.find((g) => g.id === mentor.primaryGenreId);
  const inContext =
    genreContextId && mentor.genreIds.includes(genreContextId)
      ? mentor.primaryGenreId === genreContextId
      : false;

  return (
    <article className="flex flex-col rounded-xl border border-border bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-zinc-900">
            {mentor.name}
          </h3>
          <p className="mt-1 text-sm text-zinc-600">{mentor.title}</p>
        </div>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-muted text-sm font-semibold text-zinc-700"
          aria-hidden
        >
          {mentor.name
            .split(" ")
            .map((p) => p[0])
            .join("")
            .slice(0, 2)}
        </div>
      </div>
      <p className="mt-3 text-sm font-medium text-zinc-900">
        {mentor.storyTitle}
      </p>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600">
        {mentor.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {mentor.tags.slice(0, 4).map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-zinc-700"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div className="text-xs text-zinc-500">
          {primary ? (
            <span>
              Primary theme:{" "}
              <span className="font-medium text-zinc-700">{primary.title}</span>
            </span>
          ) : null}
        </div>
        {inContext ? (
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
            Featured in this theme
          </span>
        ) : null}
      </div>
      <div className="mt-4">
        <Link
          href={`/mentors/${mentor.id}`}
          className="text-sm font-semibold text-primary hover:underline"
        >
          View profile
        </Link>
      </div>
    </article>
  );
}
