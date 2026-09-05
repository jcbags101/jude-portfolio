import { techStack } from "@/lib/site";
import { Reveal } from "./ui";
import { SplitWords } from "./motion";

export function Stack() {
  return (
    <section id="stack" className="scroll-mt-20 py-20 md:py-28">
      <div className="wrap">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-[var(--color-rule)] pb-4">
            <span className="label">Toolkit</span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <h2 className="display text-[clamp(1.9rem,4vw,3.2rem)]">
              <SplitWords as="span" className="block">
                Tools are
              </SplitWords>
              <span className="block">
                <SplitWords as="span" className="serif-em" delay={150}>
                  means,
                </SplitWords>{" "}
                <SplitWords as="span" delay={210}>
                  not ends.
                </SplitWords>
              </span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-[var(--color-ink-2)]">
              I reach for whatever fits the problem. These are the ones I&rsquo;ve
              shipped production work with.
            </p>
          </Reveal>

          <div className="md:col-span-8">
            {techStack.map((group, i) => (
              <Reveal key={group.label} delay={i * 55}>
                <div className="grid gap-3 border-b border-[var(--color-rule)] py-6 first:border-t sm:grid-cols-12 sm:gap-6">
                  <span className="label sm:col-span-3 sm:pt-1">
                    {group.label}
                  </span>
                  <ul className="flex flex-wrap gap-x-5 gap-y-2 sm:col-span-9">
                    {group.items.map((item) => (
                      <li key={item} className="text-[var(--color-ink-2)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
