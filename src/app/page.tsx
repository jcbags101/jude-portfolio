import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Stack } from "@/components/Stack";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { site, experience, featured, projects, techStack } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.role,
  description: site.description,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: { "@type": "PostalAddress", addressLocality: "Tacloban City", addressCountry: "PH" },
  sameAs: [site.social.linkedin, site.social.github],
  knowsAbout: techStack.flatMap((g) => g.items),
  worksFor: { "@type": "Organization", name: experience[0].company },
  hasOccupation: {
    "@type": "Occupation",
    name: site.role,
    skills: techStack.flatMap((g) => g.items).join(", "),
  },
  subjectOf: [featured, ...projects].map((p) => ({
    "@type": "CreativeWork",
    name: p.name,
    url: p.href,
    description: p.blurb,
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <Work />
        <Experience />
        <Stack />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
