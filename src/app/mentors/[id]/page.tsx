import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { MentorAvatar } from "@/components/MentorAvatar";
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
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <MentorAvatar
                mentorId={mentor.id}
                size="lg"
                className="sm:mt-1"
                title={`Illustrated avatar for ${mentor.name}`}
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-3xl font-semibold tracking-tight text-foreground">
                  {mentor.name}
                </h1>
                <p className="mt-2 text-sm text-foreground-muted">{mentor.title}</p>
                <p className="mt-3 text-xs leading-relaxed text-foreground-soft">
                  Illustrated placeholder — in production this would be the
                  mentor&apos;s photo or chosen portrait, paired with their story
                  below so the human side comes through first.
                </p>
              </div>
            </div>

            <p className="mt-5 text-lg font-semibold text-foreground">
              {mentor.storyTitle}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
              {mentor.bio}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {mentor.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-surface-muted px-3 py-1 text-xs font-semibold text-foreground-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <h2 className="text-base font-semibold text-foreground">
              Areas of expertise
            </h2>
            <p className="mt-1 text-sm text-foreground-muted">
              A quick table of contents for this mentor’s “human book.”
            </p>
            <ul className="mt-4 space-y-2 text-sm text-foreground">
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
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-semibold text-foreground">Themes</div>
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
              <p className="mt-3 text-xs text-foreground-soft">
                Primary theme:{" "}
                <span className="font-medium text-foreground-muted">
                  {primary.title}
                </span>
              </p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="text-sm font-semibold text-foreground">
              Mentor signals
            </div>
            <div className="mt-3 space-y-2 text-sm text-foreground-muted">
              <div>
                <span className="font-semibold text-foreground">
                  {mentor.rating.toFixed(1)}
                </span>{" "}
                / 5 average (prototype)
              </div>
              <div>
                <span className="font-semibold text-foreground">
                  {mentor.mentoredCount}
                </span>{" "}
                LCP conversations supported
              </div>
              <div className="text-sm text-foreground-muted">
                Availability: {mentor.availabilitySummary}
              </div>
            </div>
            {mentor.testimonial ? (
              <blockquote className="mt-4 rounded-xl bg-surface-muted p-4 text-sm italic text-foreground-muted">
                {mentor.testimonial}
              </blockquote>
            ) : null}
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6 shadow-sm">
            <div className="text-sm font-semibold text-foreground">
              Check out this mentor
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
              Book a time-boxed conversation. In the full product this would sync
              to calendars and generate a Teams link.
            </p>
            <div className="mt-4">
              <ButtonLink href={`/book/${mentor.id}`} className="w-full">
                Choose a time
              </ButtonLink>
            </div>
            <div className="mt-3 text-xs text-foreground-muted">
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
