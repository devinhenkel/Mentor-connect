import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { genres, getMentorById } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function MentorPage({ params }: Props) {
  const { id } = await params;
  const mentor = getMentorById(id);
  if (!mentor) notFound();

  const primary = genres.find((g) => g.id === mentor.primaryGenreId);
  const themeLinks = mentor.genreIds
    .map((gid) => genres.find((g) => g.id === gid))
    .filter(Boolean) as typeof genres;

  return (
    <div className="space-y-8">
      <Link href="/" className="text-sm font-semibold text-primary hover:underline">
        ← Home
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
                  {mentor.name}
                </h1>
                <p className="mt-2 text-sm text-zinc-600">{mentor.title}</p>
              </div>
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full bg-surface-muted text-base font-semibold text-zinc-700"
                aria-hidden
              >
                {mentor.name
                  .split(" ")
                  .map((p) => p[0])
                  .join("")
                  .slice(0, 2)}
              </div>
            </div>

            <p className="mt-5 text-lg font-semibold text-zinc-900">
              {mentor.storyTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">
              {mentor.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {mentor.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-zinc-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-semibold text-zinc-900">
              Areas of expertise
            </h2>
            <p className="mt-1 text-sm text-zinc-600">
              A quick table of contents for this mentor’s “human book.”
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-800">
              {mentor.expertise.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">Themes</div>
            <div className="mt-3 flex flex-wrap gap-2">
              {themeLinks.map((g) => (
                <Link
                  key={g.id}
                  href={`/genres/${g.slug}`}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary hover:underline"
                >
                  {g.title}
                </Link>
              ))}
            </div>
            {primary ? (
              <p className="mt-3 text-xs text-zinc-500">
                Primary theme:{" "}
                <span className="font-medium text-zinc-700">
                  {primary.title}
                </span>
              </p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">
              Mentor signals
            </div>
            <div className="mt-3 space-y-2 text-sm text-zinc-700">
              <div>
                <span className="font-semibold text-zinc-900">
                  {mentor.rating.toFixed(1)}
                </span>{" "}
                / 5 average (prototype)
              </div>
              <div>
                <span className="font-semibold text-zinc-900">
                  {mentor.mentoredCount}
                </span>{" "}
                LCP conversations supported
              </div>
              <div className="text-sm text-zinc-600">
                Availability: {mentor.availabilitySummary}
              </div>
            </div>
            {mentor.testimonial ? (
              <blockquote className="mt-4 rounded-xl bg-surface-muted p-4 text-sm italic text-zinc-700">
                {mentor.testimonial}
              </blockquote>
            ) : null}
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-sm">
            <div className="text-sm font-semibold text-zinc-900">
              Check out this mentor
            </div>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700">
              Book a time-boxed conversation. In the full product this would sync
              to calendars and generate a Teams link.
            </p>
            <div className="mt-4">
              <ButtonLink href={`/book/${mentor.id}`} className="w-full">
                Choose a time
              </ButtonLink>
            </div>
            <div className="mt-3 text-xs text-zinc-600">
              Prototype stores confirmations under{" "}
              <Link className="font-semibold text-primary hover:underline" href="/activity">
                My activity
              </Link>
              .
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
