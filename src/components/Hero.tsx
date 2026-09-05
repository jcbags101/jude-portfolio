import Image from "next/image";
import Link from "next/link";
import { featured, site, marqueeTech } from "@/lib/site";
import { Reveal } from "./ui";
import { SplitWords, Wipe, Parallax } from "./motion";

export function Hero() {
  return (
    <section id="top" className="pt-16 md:pt-24">
      <div className="wrap">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-4">
            <span className="label">{site.role}</span>
            <span className="label">{site.contact.location}</span>
          </div>
        </Reveal>

        <h1 className="display mt-10 text-[clamp(2.5rem,8.5vw,8rem)]">
          <SplitWords as="span" className="block" delay={120}>
            I build software
          </SplitWords>
          <span className="block">
            <SplitWords as="span" delay={280}>
              people
            </SplitWords>{" "}
            <SplitWords as="span" className="serif-em" delay={370}>
              actually
            </SplitWords>{" "}
            <SplitWords as="span" delay={440}>
              use.
            </SplitWords>
          </span>
        </h1>

        <div className="mt-12 grid gap-8 border-t border-[var(--color-rule)] pt-8 md:grid-cols-12">
          <Reveal delay={120} className="md:col-span-5">
            <p className="label">
              {site.name} — since {site.since}
            </p>
          </Reveal>
          <Reveal delay={160} className="md:col-span-7">
            <p className="max-w-xl text-lg leading-[1.5] text-[var(--color-ink-2)] md:text-xl">
              Seven years of full-stack work, from a fintech wallet used by
              thousands to multi-branch operations systems that replaced paper.
              Mostly React, Next.js, Node and TypeScript — plus the boring parts
              that keep software running once it&rsquo;s live.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
              <Link
                href="#contact"
                className="label !text-[var(--color-paper)] bg-[var(--color-ink)] px-5 py-3 transition-colors hover:bg-[var(--color-accent)]"
              >
                Get in touch
              </Link>
              <Link
                href="#work"
                className="link-underline label group !text-[var(--color-ink)]"
              >
                See selected work{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">
                  ↓
                </span>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Featured project screenshot */}
      <div className="mt-16 md:mt-24">
        <figure className="wrap">
          <Parallax amount={-26}>
            <Wipe className="overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
              <Image
                src={featured.src}
                alt={featured.alt}
                priority
                placeholder="blur"
                sizes={featured.sizes}
                className="w-full"
              />
            </Wipe>
          </Parallax>
          <figcaption className="mt-3 flex flex-wrap justify-between gap-2">
            <span className="label">
              {featured.name} — {featured.kind}
            </span>
            <span className="label">{featured.year}</span>
          </figcaption>
        </figure>
      </div>

      <div className="ticker mt-16 overflow-hidden border-y border-[var(--color-rule)] py-3">
        <div className="ticker-track">
          {Array.from({ length: 2 }).map((_, dup) => (
            <ul key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {marqueeTech.map((t) => (
                <li key={t} className="label flex items-center whitespace-nowrap">
                  <span className="px-6">{t}</span>
                  <span className="text-[var(--color-accent)]">◆</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
