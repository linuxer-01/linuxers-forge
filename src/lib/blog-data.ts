export const categories = [
  "All",
  "Startups",
  "Deep Tech",
  "Linux",
  "Campus Ventures",
  "Case Studies",
  "Events",
];

/**
 * Article bodies are stored as typed blocks rather than raw HTML so the reading
 * page renders every element with the editorial styles defined in `.article-prose`.
 */
export type ContentBlock =
  | { type: "lead"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "code"; code: string }
  | { type: "image"; src: string; alt: string; caption: string };

export type Post = {
  /** URL segment: /blogs/<slug> */
  slug: string;
  title: string;
  excerpt: string;
  /** Must be one of `categories` (excluding "All"). */
  category: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  /** Import the image at the top of this file and reference it here. */
  image: string;
  /** At most one post should set this; it becomes the lead card on /blogs. */
  featured?: boolean;
  tags: string[];
  content: ContentBlock[];
};

/**
 * Real Linuxers articles go here. Empty until the E-Cell publishes its first
 * post — every page handles the empty state, so the site is safe to ship as is.
 *
 * To add one:
 *   1. `import cover from "@/assets/<file>.jpg";` at the top of this file.
 *   2. Append a Post object below. Newest first; /blogs renders in this order.
 *   3. Build the body from ContentBlock entries, e.g.
 *      { type: "h2", text: "..." }, { type: "p", text: "..." }
 */
export const posts: Post[] = [];

export function getPostBySlug(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

/** Neighbouring articles for the previous/next footer on a reading page. */
export function getAdjacentPosts(slug: string) {
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return { previous: posts[index - 1], next: posts[index + 1] };
}

/** Same-category articles first, topped up with the newest stories. */
export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const current = getPostBySlug(slug);
  if (!current) return posts.slice(0, limit);
  const sameCategory = posts.filter(
    (post) => post.slug !== slug && post.category === current.category,
  );
  const others = posts.filter((post) => post.slug !== slug && post.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}
