import Image from "next/image";
import { featured, projects, clientWork } from "@/lib/site";
import { Reveal } from "./ui";
import { SplitWords, Wipe, Parallax } from "./motion";

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-4">
            <span className="label">Selected work</span>
            <span className="label">{projects.length + 1} projects</span>
          </div>
        </Reveal>

        {/* Featured project write-up */}
        <div className="mt-10 grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <p className="label">{featured.kind}</p>
            <SplitWords
              as="h2"
              className="display mt-4 block text-[clamp(2rem,5vw,4rem)]"
              stagger={30}
            >
              {featured.name}
            </SplitWords>
          </Reveal>
          <Reveal delay={80} className="md:col-span-5 md:pt-2">
            <p className="leading-relaxed text-[var(--color-ink-2)]">
              {featured.blurb}
            </p>
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline label mt-6 inline-block !text-[var(--color-ink)]"
            >
              Open the live app ↗
            </a>
            {featured.note && (
              <p className="label mt-2 !normal-case !tracking-normal">
                {featured.note}
              </p>
            )}
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[var(--color-ink-soft)]">
              {featured.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* The rest — offset editorial layout */}
        <div className="mt-20 grid gap-x-8 gap-y-16 md:grid-cols-12">
          {projects.map((p, i) => (
            <Reveal
              key={p.name}
              delay={i * 60}
              className={
                i === 0
                  ? "md:col-span-8"
                  : i === 1
                    ? "md:col-span-4 md:pt-20"
                    : i === 2
                      ? "md:col-span-7 md:col-start-1"
                      : "md:col-span-5 md:pt-16"
              }
            >
              <article>
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Parallax amount={i % 2 === 1 ? 30 : -16}>
                    <Wipe className="overflow-hidden border border-[var(--color-rule)] bg-[var(--color-paper-2)]">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        placeholder="blur"
                        sizes={p.sizes}
                        className="w-full transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </Wipe>
                  </Parallax>
                  <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-[var(--color-rule)] pt-3">
                    <h3 className="display text-[clamp(1.3rem,2.4vw,1.9rem)] transition-colors group-hover:text-[var(--color-accent)]">
                      {p.name}
                      <span className="row-arrow ml-2 inline-block text-[0.6em]">
                        ↗
                      </span>
                    </h3>
                    <span className="label shrink-0">{p.year}</span>
                  </div>
                </a>
                <p className="label mt-1">{p.kind}</p>
                <p className="mt-3 max-w-md leading-relaxed text-[var(--color-ink-2)]">
                  {p.blurb}
                </p>
                <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[var(--color-ink-soft)]">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Client work — links only, no screenshots to claim */}
        <Reveal>
          <div className="mt-24 border-t border-[var(--color-rule)] pt-8">
            <p className="label">Also shipped, through employers</p>
            <ul className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
              {clientWork.map((c) => (
                <li key={c.name} className="flex flex-col">
                  <div className="flex items-baseline justify-between gap-3">
                    {c.href ? (
                      <a
                        href={c.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-lg font-semibold tracking-[-0.02em]"
                      >
                        {c.name} ↗
                      </a>
                    ) : (
                      <span className="text-lg font-semibold tracking-[-0.02em]">
                        {c.name}
                      </span>
                    )}
                    <span className="label shrink-0">{c.via}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink-soft)]">
                    {c.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
