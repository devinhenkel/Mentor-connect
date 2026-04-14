import Link from "next/link";
import { forumThreads, genres } from "@/lib/data";

export default function ForumPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
          LCP Community Forum
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Threads are tagged to themes so browsing stays consistent with mentor
          discovery.
        </p>
      </div>

      <div className="divide-y divide-border rounded-2xl border border-border bg-white shadow-sm">
        {forumThreads.map((t) => {
          const genre = genres.find((g) => g.id === t.genreId);
          return (
            <Link
              key={t.id}
              href={`/forum/${t.id}`}
              className="block px-5 py-4 transition hover:bg-surface-muted"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-zinc-900">
                  {t.title}
                </div>
                {genre ? (
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                    {genre.title}
                  </span>
                ) : null}
              </div>
              <div className="mt-1 text-sm text-zinc-600">{t.excerpt}</div>
              <div className="mt-2 text-xs text-zinc-500">
                {t.replyCount} replies · {t.lastActivity}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
