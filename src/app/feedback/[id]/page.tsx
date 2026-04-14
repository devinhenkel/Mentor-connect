import { Suspense } from "react";
import { notFound } from "next/navigation";
import { FeedbackClient } from "@/components/FeedbackClient";
import { getMentorById } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FeedbackPage({ params }: Props) {
  const { id } = await params;
  const mentor = getMentorById(id);
  if (!mentor) notFound();

  return (
    <Suspense
      fallback={
        <div className="text-sm text-foreground-muted">Loading feedback form…</div>
      }
    >
      <FeedbackClient mentor={mentor} />
    </Suspense>
  );
}
