/**
 * Single source of truth for all site copy and outbound links.
 *
 * Every page reads from here, so updating text in this file updates it
 * everywhere it appears. No content is duplicated in the route files.
 */
export const siteConfig = {
  /** Short form used for the logo wordmark and navigation. */
  name: "Linuxers",
  /** Full name used in headings and metadata. */
  fullName: "Linuxers E-Cell",
  college: "Mahalakshmi Tech Campus",
  tagline: "From Student to Entrepreneur – Turning Dreams into Ventures.",

  hero: {
    heading: "From Student to Entrepreneur",
    subheading: "Turning Dreams into Ventures.",
    description:
      "Linuxers E-Cell is the entrepreneurial community of Mahalakshmi Tech Campus, empowering students to build, innovate, and transform ideas into real-world ventures through practical learning, collaboration, and leadership.",
  },

  about: {
    heading: "The official entrepreneurship community of Mahalakshmi Tech Campus.",
    paragraphs: [
      "Linuxers E-Cell is the official entrepreneurship community of Mahalakshmi Tech Campus, created to inspire students to think beyond classrooms and take their first steps toward innovation and entrepreneurship.",
      "We believe that great ideas deserve the opportunity to grow. Through workshops, startup awareness sessions, hackathons, networking events, mentorship, and collaborative projects, we provide a platform where students can learn, experiment, build, and launch meaningful solutions.",
      "Whether someone is exploring their first idea or working toward a startup, Linuxers exists to support that journey—from curiosity to execution.",
    ],
  },

  vision:
    "To cultivate a culture where entrepreneurship becomes a natural aspiration, empowering students to transform their ideas into impactful solutions.",

  mission:
    "To build a strong campus entrepreneurial ecosystem through workshops, startup awareness, hackathons, networking, mentorship, idea competitions, and collaboration, helping students turn their ideas into reality.",

  activities: {
    description:
      "This section will showcase our workshops, hackathons, startup events, competitions, collaborations, and community initiatives.",
  },

  gallery: {
    description:
      "A categorized photo gallery highlighting our events, workshops, competitions, and community moments.",
  },
};

export type SocialLink = {
  /** Lucide icon resolved by the consuming component. */
  key: "instagram" | "linkedin" | "github" | "email" | "website";
  label: string;
  /** Shown as the editable value in admin settings, and under each contact card. */
  handle: string;
  href: string;
};

/** Add a GitHub or website entry here when the E-Cell has one. */
export const socialLinks: SocialLink[] = [
  {
    key: "instagram",
    label: "Instagram",
    handle: "@mtc.linuxers",
    href: "https://instagram.com/mtc.linuxers",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "ecell-linuxers",
    href: "https://www.linkedin.com/in/ecell-linuxers-94659642b/",
  },
  {
    key: "email",
    label: "Email",
    handle: "linuxersmtc@gmail.com",
    href: "mailto:linuxersmtc@gmail.com",
  },
];

export const footerLinks = socialLinks;
