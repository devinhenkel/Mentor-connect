import Link from "next/link";
import { notFound } from "next/navigation";
import { forumThreads, genres } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

const SAMPLE_REPLIES = [
  {
    author: "Mentor",
    name: "Ben Reyes",
    body: "We run two cadences: weekly operational touchpoints for the working team, and a monthly steering for decisions. The trick is making the monthly meeting *decision-heavy*—pre-reads required.",
  },
  {
    author: "Peer LCP",
    name: "Samira Khan",
    body: "I’ve used a one-page ‘cadence charter’ with the client sponsor. It sounds corporate, but it prevents the weekly status trap.",
  },
];

export default async function ForumThreadPage({ params }: Props) {
  const { id } = await params;
  const thread = forumThreads.find((t) => t.id === id);
  if (!thread) notFound();
  const genre = genres.find((g) => g.id === thread.genreId);

  return (
    <div className="space-y-6">
      <Link href="/forum" className="text-sm font-semibold text-primary hover:underline">
        ← Forum
      </Link>

      <article className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-balance text-2xl font-semibold tracking-tight text-foreground">
            {thread.title}
          </h1>
          {genre ? (
            <Link
              href={`/genres/${genre.slug}`}
              className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:underline"
            >
              {genre.title}
            </Link>
          ) : null}
        </div>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          {thread.excerpt}
        </p>
        <div className="mt-4 text-xs text-foreground-soft">
          {thread.replyCount} replies · Last activity {thread.lastActivity}
        </div>
      </article>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold text-foreground">Replies (sample)</h2>
        <div className="space-y-3">
          {SAMPLE_REPLIES.map((r) => (
            <div
              key={r.name}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="text-sm font-semibold text-foreground">{r.name}</div>
                <div className="text-xs font-semibold text-primary">{r.author}</div>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground-muted">{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm text-foreground-muted">
        Prototype: replies are static. In a pilot, seed questions and attach
        mentors to high-signal threads.
      </div>
    </div>
  );
}
