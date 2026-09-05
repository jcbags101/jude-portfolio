import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="wrap flex flex-1 flex-col justify-center py-24">
        <span className="label">Error 404</span>
        <h1 className="display mt-6 text-[clamp(2.5rem,9vw,7rem)]">
          That page
          <br />
          doesn&rsquo;t <span className="serif-em">exist</span>.
        </h1>
        <p className="mt-8 max-w-md leading-relaxed text-[var(--color-ink-2)]">
          The link may be broken, or the page may have moved. Everything worth seeing is on the home page.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
          <Link
            href="/"
            className="label !text-[var(--color-paper)] bg-[var(--color-ink)] px-5 py-3 transition-colors hover:bg-[var(--color-accent)]"
          >
            ← Back to home
          </Link>
          <a
            href={`mailto:${site.contact.email}`}
            className="link-underline label !text-[var(--color-ink)]"
          >
            {site.contact.email}
          </a>
        </div>
      </div>
    </main>
  );
}
