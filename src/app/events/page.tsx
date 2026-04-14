import Link from "next/link";
import { events, genres } from "@/lib/data";

export default function EventsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Events
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-foreground-muted">
          AMAs and small group sessions—listed here to test whether events belong
          beside themes, mentors, or both.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {events.map((e) => {
          const genre = genres.find((g) => g.id === e.genreId);
          return (
            <div
              key={e.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="text-base font-semibold text-foreground">{e.title}</div>
              <div className="mt-1 text-xs text-foreground-soft">{e.startsAt}</div>
              <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                {e.description}
              </p>
              <div className="mt-4 text-xs font-medium text-foreground-soft">
                Host: {e.host}
              </div>
              {genre ? (
                <div className="mt-4">
                  <Link
                    href={`/genres/${genre.slug}`}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Browse {genre.title}
                  </Link>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
