import genresData from "@/data/genres.json";
import mentorsData from "@/data/mentors.json";
import forumData from "@/data/forum.json";
import eventsData from "@/data/events.json";
import type { EventItem, ForumThread, Genre, Mentor } from "@/lib/types";

export const genres = genresData as Genre[];
export const mentors = mentorsData as Mentor[];
export const forumThreads = forumData as ForumThread[];
export const events = eventsData as EventItem[];

export function getGenreBySlug(slug: string): Genre | undefined {
  return genres.find((g) => g.slug === slug);
}

export function getMentorById(id: string): Mentor | undefined {
  return mentors.find((m) => m.id === id);
}

export function mentorsForGenre(genreId: string): Mentor[] {
  return mentors.filter((m) => m.genreIds.includes(genreId));
}

export function tagsInGenre(genreId: string): string[] {
  const set = new Set<string>();
  for (const m of mentorsForGenre(genreId)) {
    for (const t of m.tags) set.add(t);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
}

export function searchMentors(query: string): Mentor[] {
  const q = query.trim().toLowerCase();
  if (!q) return mentors;
  return mentors.filter((m) => {
    const hay = [
      m.name,
      m.title,
      m.summary,
      m.storyTitle,
      ...m.tags,
      ...m.expertise,
      ...m.genreIds.map((id) => genres.find((g) => g.id === id)?.title ?? ""),
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function threadsForGenre(genreId: string): ForumThread[] {
  return forumThreads.filter((t) => t.genreId === genreId);
}

export function eventsForGenre(genreId: string): EventItem[] {
  return events.filter((e) => e.genreId === genreId);
}
