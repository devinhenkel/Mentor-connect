export type BookedSession = {
  id: string;
  mentorId: string;
  mentorName: string;
  slotLabel: string;
  bookedAt: string;
};

const STORAGE_KEY = "mc_prototype_sessions_v1";

function randomId() {
  return `s_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

export function loadSessions(): BookedSession[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed as BookedSession[];
  } catch {
    return [];
  }
}

export function saveSessions(sessions: BookedSession[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
}

export function addSession(input: Omit<BookedSession, "id" | "bookedAt">) {
  const next: BookedSession = {
    id: randomId(),
    bookedAt: new Date().toISOString(),
    ...input,
  };
  const sessions = [next, ...loadSessions()];
  saveSessions(sessions);
  return next;
}
