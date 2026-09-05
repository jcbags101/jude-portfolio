import { experience, site } from "@/lib/site";
import { Reveal } from "./ui";
import { SplitWords } from "./motion";

export function Experience() {
  return (
    <section
      id="experience"
      className="scroll-mt-20 border-t border-[var(--color-rule)] bg-[var(--color-paper-2)] py-20 md:py-28"
    >
      <div className="wrap">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-4">
            <span className="label">Experience</span>
            <span className="label">{site.since}—present</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="display text-[clamp(1.9rem,4vw,3.2rem)] md:sticky md:top-28">
              <SplitWords as="span" className="block">
                Seven years of
              </SplitWords>
              <span className="block">
                <SplitWords as="span" className="serif-em" delay={150}>
                  shipping
                </SplitWords>{" "}
                <SplitWords as="span" delay={210}>
                  to production.
                </SplitWords>
              </span>
            </h2>
          </Reveal>

          <div className="md:col-span-8">
            {experience.map((job, i) => (
              <Reveal key={`${job.company}-${job.period}`} delay={i * 50}>
                <div className="row-hover grid gap-3 border-b border-[var(--color-rule)] px-2 py-8 first:border-t sm:grid-cols-12 sm:gap-6">
                  <div className="sm:col-span-4">
                    <p className="text-lg font-semibold leading-snug tracking-[-0.02em]">
                      {job.company}
                    </p>
                    <p className="label mt-1">{job.period}</p>
                    <p className="label mt-0.5 !normal-case !tracking-normal">
                      {job.location}
                    </p>
                  </div>
                  <div className="sm:col-span-8">
                    <p className="font-medium text-[var(--color-ink)]">
                      {job.role}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {job.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex gap-2.5 text-sm leading-relaxed text-[var(--color-ink-2)]"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 h-px w-3 shrink-0 bg-[var(--color-accent)]"
                          />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
