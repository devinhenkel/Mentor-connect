import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/forum", label: "Forum" },
  { href: "/events", label: "Events" },
  { href: "/activity", label: "My activity" },
];

export function Header() {
  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-semibold text-primary-foreground">
            MC
          </span>
          <div className="leading-tight">
            <div className="text-sm font-semibold text-zinc-900">
              Mentor Connector
            </div>
            <div className="text-xs text-zinc-500">Prototype</div>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-zinc-700 transition hover:bg-surface-muted hover:text-zinc-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
