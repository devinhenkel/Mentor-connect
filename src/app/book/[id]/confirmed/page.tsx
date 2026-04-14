import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/Button";
import { ConfirmedSessionRecorder } from "@/components/ConfirmedSessionRecorder";
import { getMentorById } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ slot?: string }>;
};

export default async function BookConfirmedPage({ params, searchParams }: Props) {
  const { id } = await params;
  const { slot } = await searchParams;
  const mentor = getMentorById(id);
  if (!mentor) notFound();

  const slotLabel = slot ?? "your selected time";

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <ConfirmedSessionRecorder
        mentorId={mentor.id}
        mentorName={mentor.name}
        slotLabel={slotLabel}
      />
      <Link
        href={`/book/${mentor.id}`}
        className="text-sm font-semibold text-primary hover:underline"
      >
        ← Change time
      </Link>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm font-semibold text-primary">You’re checked out</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
          {mentor.name} · {slotLabel}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
          In a full build, you’d receive a calendar hold and a Teams link. For
          now, treat this as alignment on tone: playful library metaphor,
          serious outcomes.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-border bg-surface-muted/60 p-4 text-sm text-foreground-muted">
          <div className="font-semibold text-foreground">Suggested next steps</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Optional pre-session note to set context</li>
            <li>Join Teams at start time</li>
            <li>Afterwards: return the mentor (feedback)</li>
          </ul>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink
            href={`/feedback/${mentor.id}?slot=${encodeURIComponent(slotLabel)}`}
          >
            Return & rate session
          </ButtonLink>
          <ButtonLink href="/activity" variant="secondary">
            My activity
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
