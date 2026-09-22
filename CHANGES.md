# Project changes — Linuxers E-Cell site

Written for whoever (or whatever) picks this project up next, including the
Lovable editor. It explains what the site is now, what was deliberately left
empty, and the conventions to follow so later edits do not undo these choices.

---

## 1. All real content lives in one file

`src/lib/site-config.ts` is the single source of truth for site copy and links:
club name, college, tagline, hero text, About paragraphs, Vision, Mission,
Activities/Gallery descriptions, and the social links.

**Edit text there, not in the route files.** Nothing is duplicated across pages,
so changing a string in that file updates everywhere it appears.

Current values are the real ones supplied by the E-Cell:

- Linuxers E-Cell, Mahalakshmi Tech Campus
- Tagline: "From Student to Entrepreneur - Turning Dreams into Ventures."
- Instagram `@mtc.linuxers`, LinkedIn `ecell-linuxers`, Email `linuxersmtc@gmail.com`

There is no GitHub or website link because the club did not supply one. Adding
either is one entry in `socialLinks`; the icon map already supports both keys.

---

## 2. The blog is intentionally empty

`src/lib/blog-data.ts` exports `posts: Post[] = []`.

This is **not** an oversight or a bug. An earlier version of this site shipped
six full articles with invented authors, invented quotes, invented events and
invented statistics. For a real student organisation that is fabricated content
presented as fact, so it was all removed.

**Do not repopulate this with placeholder or sample articles.** Only real posts
written by the E-Cell belong here.

Everything around the empty list still works and is fully built:

- `/blogs` listing with search, category filters and result counts
- `/blogs/$slug` reading page with typed content blocks, prev/next and related posts
- A featured-post lead card, driven by the `featured` flag
- Admin blog management table, editor, media library and settings

Every one of those renders a designed "Coming soon" empty state while `posts` is
empty, and unknown slugs correctly return 404.

### Adding a real post

1. `import cover from "@/assets/<file>.jpg";` at the top of `blog-data.ts`
2. Append a `Post` object to `posts` (newest first — `/blogs` renders in order)
3. Build the body from `ContentBlock` entries:
   `{ type: "h2", text: "..." }`, `{ type: "p", text: "..." }`, `quote`, `ul`,
   `ol`, `code`, `image`, `lead`

The reading page renders each block type with the `.article-prose` styles.

---

## 3. Other sections are also "Coming soon" by request

- **Gallery** — no photos. The four stock photos that shipped with the scaffold
  were removed from the public site: they show people who are not E-Cell members,
  and were captioned as if they were. The hero background photo was removed for
  the same reason. Real event photography can replace the empty state.
- **Activities** — no programme list. The three activity names previously shown
  were invented.
- **Statistics** — the "26 Builders / 08 Active teams / 14 Sessions / 04 Demo
  days" block was removed entirely. Those numbers were invented.
- **Admin dashboard metrics** now derive from `posts.length` instead of the
  invented "24 published / 18.2k reads" figures.

The four stock images still exist in `src/assets/` but are referenced **only**
inside the admin mockup's media library and attachment picker, as sample assets.
Nothing public uses them.

---

## 4. Routing was broken and is now fixed

Previously `blogs.campus-innovation.tsx` and `admin.editor.tsx` were file-routed
as **children** of `blogs.tsx` and `admin.tsx`, but neither parent rendered an
`<Outlet />`. Visiting `/blogs/campus-innovation` rendered the listing page and
`/admin/editor` rendered the dashboard — both detail pages were unreachable.

Fixed by making them siblings: `blogs.index.tsx` / `admin.index.tsx` for the
index routes, with `blogs.$slug.tsx`, `admin.editor.tsx`, `admin.blogs.tsx`,
`admin.media.tsx` and `admin.settings.tsx` alongside them.

If you add a route with children, the parent must render `<Outlet />`.

---

## 5. Design system — light "cosmic" theme

Defined entirely in `src/styles.css`. All colours are oklch, as the file requires.

- **Canvas**: misty silver-blue with a soft top vignette
- **Ink**: near-black navy
- **Primary**: electric blue. **Secondary**: warm gold
- **Surfaces**: white / frosted white cards

### The `-ink` naming convention — important

`--blue` and `--gold` are **fill and border** colours.
`--blue-ink` and `--gold-ink` are the **deeper, text-safe** variants.

On a light canvas an accent must be *darker* than the base colour to stay
legible as text — the inverse of a dark theme, where the "soft" variant is
lighter. Use `text-blue-ink` / `text-gold-ink` for text, and `bg-blue` /
`border-gold` for fills. `--destructive-ink` exists for the same reason.

Using `text-gold` on a light background will fail contrast. This was measured,
not guessed: all text across seven pages passes WCAG AA.

### Utilities

- `ambient-canvas` — tiling starfield (radial-gradient dots on a 240x230 tile,
  no image request) over soft blue/gold washes. It has `overflow: clip`, which
  is **load-bearing**: the washes are positioned outside the element and without
  it they widen the document and cause horizontal page scroll at every breakpoint.
- `glass-card` / `glass-card-interactive` — frosted white card, lifts on hover
- `glass-panel` — frosted surface for inputs and chips
- `badge-blue` / `badge-gold`

### Components

- `src/components/linuxers-logo.tsx` — inline SVG mark (terminal caret forming an
  "L", blue-to-gold gradient). Generates its gradient id per instance via
  `useId()` because it renders several times per page.
- `src/components/drop-zone.tsx` — shared drag-and-drop target used by both the
  blog editor and the media library.
- `src/components/site-shell.tsx` / `admin-shell.tsx` — public and admin layouts.

---

## 6. The blog editor

`src/routes/admin.editor.tsx` is a frontend mockup — nothing persists.

- Banner and thumbnail zones are **real** drag-and-drop targets
- The photo attachment grid can insert an MDX image reference into the draft body
- The slug is derived from the title
- The preview pane renders the **actual draft** via a small Markdown renderer
  (`renderPreview`). It previously showed hardcoded text regardless of input.

---

## 7. Known pre-existing issues — not introduced by this work

- `npx tsc --noEmit` reports errors in five **unused** shadcn components:
  `alert-dialog`, `calendar`, `carousel`, `pagination`, `sidebar`. They fail
  because `button.tsx` was customised and no longer exports `buttonVariants` or
  `ButtonProps`. Application code is clean.
- `npx eslint` fails repo-wide on the original Lovable-generated files, which
  were written as very long single lines (`index.tsx` alone had 70 errors before
  it was rewritten). Files touched by this work are lint-clean; the untouched
  dense files were deliberately not reformatted to avoid a huge unrelated diff.

---

## 8. Verification performed

- `npm run build` — green
- `npx tsc --noEmit` — zero errors outside `src/components/ui/`
- `npx eslint` — clean on all changed files
- **Responsive**: no horizontal overflow on 9 pages x 3 widths (320 / 768 / 1280),
  measured via the Chrome DevTools Protocol rather than by eye
- **Contrast**: all text meets WCAG AA across 7 pages, measured the same way
- **Interaction**: drag-over restyling, file drop, MDX insertion and category
  filtering all verified against the running app

Frontend only, per the original brief: no backend, auth, database, API or CMS.
Uploads, save and publish are non-persistent mockups.
