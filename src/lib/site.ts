/**
 * Central content + config for Jude Clarence Baguinang's portfolio.
 *
 * Rule for this file: every claim must be something we can point at — a live
 * URL, a shipped app, a real role. No invented metrics or testimonials.
 */

import type { StaticImageData } from "next/image";
import roost from "@/images/work/roost.webp";
import carwash from "@/images/work/carwash.webp";
import trussfolio from "@/images/work/trussfolio.webp";
import galagrid from "@/images/work/galagrid.webp";
import lingkod from "@/images/work/lingkod.webp";

export const site = {
  name: "Jude Clarence Baguinang",
  shortName: "Jude Baguinang",
  initials: "JB",
  role: "Full-Stack Developer",
  tagline: "Full-stack developer, Philippines",
  description:
    "Jude Clarence Baguinang is a full-stack developer in the Philippines with 7+ years building production web and mobile apps — React, Next.js, Node.js, NestJS and TypeScript, from fintech wallets to multi-branch operations systems.",
  domain: "judebaguinang.com",
  url: "https://jude-portfolio.vercel.app",
  contact: {
    email: "jmbaguinang@up.edu.ph",
    phone: "+63 950 502 0601",
    location: "Tacloban City, Philippines",
  },
  social: {
    github: "https://github.com/jcbags101",
    linkedin: "https://www.linkedin.com/in/jude-baguinang/",
  },
  since: 2018,
} as const;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
] as const;

/* ------------------------------------------------------------------ */
/* Work — everything below is live and linkable.                        */
/* ------------------------------------------------------------------ */

export type Project = {
  name: string;
  kind: string;
  year: string;
  blurb: string;
  href: string;
  stack: string[];
  src: StaticImageData;
  alt: string;
  /** Rendered-width hint for `sizes`. */
  sizes: string;
  note?: string;
};

export const featured: Project = {
  name: "Roost",
  kind: "Livestock & farm management SaaS",
  year: "2026",
  blurb:
    "A working farm runs on scattered notebooks and memory — which animal is conditioning, what was vaccinated when, whether the month actually made money. Roost puts the herd, its health, its breeding lines and the finances behind them in one dashboard, with role-based access so an owner and a farmhand see different things.",
  href: "https://gamefowl-pro.vercel.app",
  stack: ["Next.js 15", "TypeScript", "Prisma", "PostgreSQL (Neon)", "Tailwind"],
  src: roost,
  alt: "Roost dashboard showing herd totals, win rate, monthly performance chart and age distribution",
  sizes: "(max-width: 768px) 100vw, 1280px",
  note: "Live demo — sign in is pre-filled",
};

export const projects: Project[] = [
  {
    name: "Multi-branch car wash system",
    kind: "Operations platform",
    year: "2026",
    blurb:
      "Five branches tracking vehicles, staff and cash on paper. One system that follows a car from arrival to payment — queue, wash bay, quality check, POS — with head office seeing all five live.",
    href: "https://lls-carwash-poc.vercel.app",
    stack: ["Next.js", "Prisma", "PostgreSQL", "JWT auth"],
    src: carwash,
    alt: "Car wash executive dashboard with sales, live job status and per-branch revenue",
    sizes: "(max-width: 768px) 100vw, 820px",
  },
  {
    name: "Trussfolio",
    kind: "Contractor directory",
    year: "2026",
    blurb:
      "Hiring a contractor in the Philippines means trusting a stranger. Trussfolio is built around PCAB licence verification, so search starts from who is actually accredited.",
    href: "https://trussfolio.com",
    stack: ["Next.js", "Supabase", "Cloudinary", "Resend"],
    src: trussfolio,
    alt: "Trussfolio contractor directory homepage",
    sizes: "(max-width: 768px) 100vw, 400px",
  },
  {
    name: "GalaGrid",
    kind: "Event-supplier marketplace",
    year: "2026",
    blurb:
      "A marketplace pairing Filipino event organisers with suppliers — listings, search and booking in one place instead of a dozen Facebook pages.",
    href: "https://galagrid-revamp.vercel.app",
    stack: ["Next.js 16", "Supabase", "Cloudflare R2", "ImageKit"],
    src: galagrid,
    alt: "GalaGrid event supplier marketplace homepage",
    sizes: "(max-width: 768px) 100vw, 720px",
  },
  {
    name: "Lingkod Pass",
    kind: "Civil Service Exam prep",
    year: "2025",
    blurb:
      "Timed drills, mock exams and review built for Philippine Civil Service Exam takers — the practice loop, not another PDF reviewer.",
    href: "https://lingkod-quiz.vercel.app",
    stack: ["Next.js", "Tailwind", "Supabase"],
    src: lingkod,
    alt: "Lingkod Pass civil service exam practice app homepage",
    sizes: "(max-width: 768px) 100vw, 720px",
  },
];

/* ------------------------------------------------------------------ */
/* Client work shipped through employers — no screenshots, just links.  */
/* ------------------------------------------------------------------ */

export type ClientWork = {
  name: string;
  detail: string;
  href?: string;
  via: string;
};

export const clientWork: ClientWork[] = [
  {
    name: "M Lhuillier wallet & web app",
    detail:
      "Backend services for the MCash mobile wallet, and full-stack features for the customer web app.",
    href: "https://mlhuillier.com/app/login",
    via: "Symph",
  },
  {
    name: "Lesson Planner",
    detail:
      "AI features generating curriculum-aligned lesson plans for educators.",
    href: "https://www.lessonplanner.org/v2",
    via: "Symph",
  },
  {
    name: "New Creation Church admin",
    detail: "Web platform for the church's administration application.",
    href: "https://newcreation.org.sg/",
    via: "Symph",
  },
  {
    name: "Tanod KontraCovid",
    detail:
      "COVID-19 contact-tracing and triage system used by local government units.",
    via: "AI4GOV Solutions",
  },
];

/* ------------------------------------------------------------------ */
/* Experience — reverse chronological, from CV.                         */
/* ------------------------------------------------------------------ */

export type Job = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Full-Stack Developer",
    company: "Symph",
    period: "2022 — Present",
    location: "Philippines",
    points: [
      "Build and maintain front-end and back-end features for production web apps with React, TypeScript and Node.js.",
      "Shipped an English-proficiency assessment product and an enterprise data-exchange platform on TypeORM + PostgreSQL.",
      "Work directly with product and technical stakeholders to ship features, resolve bugs and keep apps reliable.",
    ],
  },
  {
    role: "Full-Stack PHP Developer",
    company: "AI4GOV Solutions",
    period: "2020 — 2021",
    location: "Makati, Metro Manila",
    points: [
      "Built Tanod KontraCovid, a COVID-19 contact-tracing and triage system, with PHP, Laravel, MySQL and jQuery.",
      "Led R&D on the AI4GOV Engine using React and Firebase, presenting platform features to the CEO and stakeholders.",
      "Wrote PHPUnit tests and improved performance, UX and log monitoring.",
    ],
  },
  {
    role: "Part-Time Web Developer",
    company: "Let's Eat Bai",
    period: "Jun — Oct 2021",
    location: "Cebu City",
    points: [
      "Maintained rider, merchant and store admin sites with Vue, Firebase and Quasar.",
      "Kept real-time order and delivery data in sync across apps for monitoring.",
    ],
  },
  {
    role: "Freelance Web Developer",
    company: "CTU Research Portal",
    period: "Jun — Aug 2021",
    location: "Cebu City",
    points: [
      "Designed and built a portal to manage research papers across CTU campuses.",
      "React + Redux front end against a Node.js API on Sequelize.",
    ],
  },
  {
    role: "Lead Mobile Developer",
    company: "Zeend Inc.",
    period: "2019 — 2020",
    location: "Tacloban City, Leyte",
    points: [
      "Led React Native customer and merchant apps for an e-commerce platform.",
      "Owned UI/UX and mockups, built real-time order visibility, and released to the Play Store and App Store.",
    ],
  },
  {
    role: "Web Developer",
    company: "GoAbroad Philippines",
    period: "2018 — 2019",
    location: "Tacloban City, Leyte",
    points: [
      "Built React, Laravel, Lumen and MySQL features for Recognizely, GoAbroad Admin and GoAbroad.com.",
      "Created REST endpoints, reviewed teammates' code, and improved security, usability and performance.",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Stack                                                                */
/* ------------------------------------------------------------------ */

export type TechGroup = { label: string; items: string[] };

export const techStack: TechGroup[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Angular", "Vue", "Redux", "Tailwind CSS"],
  },
  {
    label: "Backend",
    items: ["Node.js", "NestJS", "Laravel / PHP", "TypeORM", "Prisma", "REST APIs", "OpenAI API"],
  },
  {
    label: "Data",
    items: ["PostgreSQL", "MySQL", "Supabase", "Firebase"],
  },
  {
    label: "Mobile",
    items: ["React Native", "Play Store", "App Store"],
  },
  {
    label: "Cloud",
    items: ["Google Cloud", "Vercel", "Cloudflare R2", "Linux"],
  },
];

export const marqueeTech = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "React Native",
  "PostgreSQL",
  "Prisma",
  "Supabase",
  "Google Cloud",
  "Tailwind CSS",
  "Vercel",
];
