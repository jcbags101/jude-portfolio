"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import { Reveal } from "./ui";
import { SplitWords } from "./motion";

const fieldClass =
  "w-full border-0 border-b border-white/20 bg-transparent px-0 py-3 text-[var(--color-paper)] transition-colors placeholder:text-[var(--color-paper)]/35 focus:border-[var(--color-accent)] focus:outline-none";

export function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `Portfolio enquiry — ${String(d.get("name") || "")}`
    );
    const body = encodeURIComponent(
      `Name: ${d.get("name")}\nEmail: ${d.get("email")}\n\n${d.get("message")}`
    );
    // TODO: swap for a server route (Resend) if this starts getting real volume.
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <section
      id="contact"
      className="scroll-mt-20 border-t border-[var(--color-rule)] bg-[var(--color-ink)] py-20 text-[var(--color-paper)] md:py-28"
    >
      <div className="wrap">
        <Reveal>
          <div className="flex items-baseline justify-between border-b border-white/15 pb-4">
            <span className="label !text-[var(--color-paper)]/60">Contact</span>
            <span className="label !text-[var(--color-paper)]/60">
              Open to work &amp; freelance
            </span>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <h2 className="display text-[clamp(2rem,5vw,4rem)]">
              <SplitWords as="span" className="block">
                Let&rsquo;s build
              </SplitWords>
              <span className="block">
                <SplitWords as="span" className="serif-em" delay={150}>
                  something
                </SplitWords>{" "}
                <SplitWords as="span" delay={210}>
                  good.
                </SplitWords>
              </span>
            </h2>
            <p className="mt-6 max-w-sm leading-relaxed text-[var(--color-paper)]/70">
              Whether it&rsquo;s a role, a build, or picking up something a
              previous developer left behind — tell me what you need and
              I&rsquo;ll tell you honestly whether I&rsquo;m the right fit.
            </p>

            <ul className="mt-10 space-y-2">
              <li>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="link-underline text-lg"
                  style={{ backgroundImage: "linear-gradient(#f2efe7,#f2efe7)" }}
                >
                  {site.contact.email}
                </a>
              </li>
              <li className="text-[var(--color-paper)]/70">
                {site.contact.phone}
              </li>
              <li className="text-[var(--color-paper)]/70">
                {site.contact.location}
              </li>
            </ul>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label !text-[var(--color-paper)] underline underline-offset-4 hover:!text-[var(--color-accent)]"
                >
                  LinkedIn ↗
                </a>
              </li>
              <li>
                <a
                  href={site.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label !text-[var(--color-paper)] underline underline-offset-4 hover:!text-[var(--color-accent)]"
                >
                  GitHub ↗
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={80} className="md:col-span-7">
            {sent ? (
              <div className="border-t border-white/15 pt-8">
                <p className="display text-3xl">Draft ready.</p>
                <p className="mt-3 max-w-sm text-[var(--color-paper)]/70">
                  Your mail app should have opened with the message filled in.
                  Send it and I&rsquo;ll get back to you.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="label mt-6 !text-[var(--color-paper)] underline underline-offset-4"
                >
                  Write another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-x-8 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="f-message"
                    className="label !text-[var(--color-paper)]/60"
                  >
                    Message
                    <span aria-hidden="true"> *</span>
                  </label>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="A sentence or two is plenty to start."
                    className={`${fieldClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  className="label mt-10 w-full !text-[var(--color-ink)] bg-[var(--color-paper)] px-6 py-4 transition-colors hover:bg-[var(--color-accent)] hover:!text-[var(--color-paper)] sm:w-auto"
                >
                  Send message →
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `f-${name}`;
  return (
    <div className="mt-6">
      <label htmlFor={id} className="label !text-[var(--color-paper)]/60">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className={fieldClass}
      />
    </div>
  );
}
