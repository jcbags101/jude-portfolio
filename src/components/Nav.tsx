"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-rule)] bg-[var(--color-paper)]/92 backdrop-blur-[2px]">
      <div className="wrap flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="flex items-baseline gap-2.5"
          aria-label={`${site.name} — home`}
        >
          <span className="font-display text-[1.05rem] font-extrabold tracking-[-0.04em]">
            Jude Baguinang
          </span>
          <span className="label hidden sm:inline">{site.role}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="link-underline label !text-[var(--color-ink)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="label !text-[var(--color-paper)] bg-[var(--color-ink)] px-4 py-2.5 transition-colors hover:bg-[var(--color-accent)]"
          >
            Get in touch
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="label !text-[var(--color-ink)] md:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--color-rule)] bg-[var(--color-paper)] md:hidden">
          <div className="wrap flex flex-col py-2">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--color-rule)] py-4 font-display text-2xl font-extrabold tracking-[-0.03em] last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={() => setOpen(false)}
              className="label mt-4 mb-2 !text-[var(--color-paper)] bg-[var(--color-ink)] px-4 py-3 text-center"
            >
              Get in touch
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
