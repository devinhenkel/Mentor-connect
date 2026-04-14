import { notFound } from "next/navigation";
import { BookClient } from "@/components/BookClient";
import { getMentorById } from "@/lib/data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const mentor = getMentorById(id);
  if (!mentor) notFound();

  return <BookClient mentor={mentor} />;
}
