import { notFound } from "next/navigation";
import { GenrePageClient } from "@/components/GenrePageClient";
import {
  eventsForGenre,
  genres,
  mentorsForGenre,
  tagsInGenre,
  threadsForGenre,
  getGenreBySlug,
} from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function GenrePage({ params }: Props) {
  const { slug } = await params;
  const genre = getGenreBySlug(slug);
  if (!genre) notFound();

  return (
    <GenrePageClient
      genre={genre}
      mentors={mentorsForGenre(genre.id)}
      allGenres={genres}
      tags={tagsInGenre(genre.id)}
      threads={threadsForGenre(genre.id)}
      upcoming={eventsForGenre(genre.id)}
    />
  );
}
