export type Genre = {
  id: string;
  slug: string;
  title: string;
  description: string;
  highlightTags: string[];
};

export type Mentor = {
  id: string;
  name: string;
  title: string;
  primaryGenreId: string;
  genreIds: string[];
  tags: string[];
  storyTitle: string;
  summary: string;
  bio: string;
  expertise: string[];
  availabilitySummary: string;
  mentoredCount: number;
  rating: number;
  testimonial?: string;
};

export type ForumThread = {
  id: string;
  genreId: string;
  title: string;
  excerpt: string;
  replyCount: number;
  lastActivity: string;
};

export type EventItem = {
  id: string;
  title: string;
  host: string;
  startsAt: string;
  genreId: string;
  description: string;
};
