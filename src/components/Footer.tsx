import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] pb-10 text-[var(--color-paper)]">
      <div className="wrap">
        {/* Oversized wordmark as the closing device */}
        <div className="border-t border-white/15 pt-10">
          <p className="display text-[clamp(2rem,11vw,9rem)] leading-[0.85] text-[var(--color-paper)]/90">
            Jude
            <br />Baguinang
          </p>
        </div>

        <div className="mt-12 grid gap-8 border-t border-white/15 pt-8 sm:grid-cols-3">
          <div>
            <p className="label !text-[var(--color-paper)]/50">Navigate</p>
            <ul className="mt-3 space-y-1">
              {nav.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    className="text-[var(--color-paper)]/80 transition-colors hover:text-[var(--color-paper)]"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="label !text-[var(--color-paper)]/50">Contact</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[var(--color-paper)]/80 transition-colors hover:text-[var(--color-paper)]"
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="text-[var(--color-paper)]/80">
                {site.contact.location}
              </li>
            </ul>
          </div>
          <div>
            <p className="label !text-[var(--color-paper)]/50">Elsewhere</p>
            <ul className="mt-3 space-y-1">
              <li>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-paper)]/80 transition-colors hover:text-[var(--color-paper)]"
                >
                  GitHub ↗
                </a>
              </li>
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-paper)]/80 transition-colors hover:text-[var(--color-paper)]"
                >
                  LinkedIn ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/15 pt-6 sm:flex-row sm:justify-between">
          <span className="label !text-[var(--color-paper)]/50">
            © {new Date().getFullYear()} {site.name}
          </span>
          <span className="label !text-[var(--color-paper)]/50">
            Built in the Philippines
          </span>
        </div>
      </div>
    </footer>
  );
}
