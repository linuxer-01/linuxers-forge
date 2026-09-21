# Linuxers Forge

Build a modern, premium frontend UI/UX website for Linuxers, the E-Cell (Entrepreneurship Cell) of Mahalakshmi Tech campus.

Important: Frontend UI/UX only. Do not build backend, authentication, database, API, or CMS logic. Everything is frontend mockups with high quality responsive design, reusable components, and realistic placeholder content.

Focus priority: First focus on the Blog Suite (Blog listing and Blog reading page) and Admin UI mockup (dashboard & blog editor), along with the landing page.

Design Theme (matching the attached color palette):
- Deep midnight dark canvas: #05070A background, #111827 surface, #1E293B frosted glass cards
- Accent colors:
  * Purple: #8B5CF6 / #A78BFA / #6A3CC9 (vision, tech, energy)
  * Emerald: #10B981 / #6EE7B7 / #34D399 (growth, entrepreneurship, startups)
  * Night Fury dark neutrals: #0B0F1A, #1E293B, #334155, #64748B
  * Light Fury / Text: #FFFFFF primary text, #94A3B8 secondary text
  * Optional highlights: #F472B6, warning #F59E0B
- Glassmorphism, subtle neon glows on hover, smooth micro-interactions, clean typography with strong visual hierarchy.

Responsive Requirements (Highest priority):
- Perfect scaling on mobile (320px+), tablet, laptop, and desktop.
- No responsive issues anywhere. No clipped text or awkward image stretching.

Website Structure:

1. Blog Listing Page:
- Header with blog title, subtitle, search bar (UI only), and category filter chips (e.g. Startups, Deep Tech, Linux, Campus Ventures, Case Studies, Events)
- Responsive blog grid: 1 col on mobile, 2 on tablet, 3 on desktop
- Cards with glass effect, thumbnail, category badge, title, excerpt, author, date, read time, "Read More", smooth hover lift and neon border glow

2. Individual Blog Reading Page:
- Distraction-free reading experience
- Large banner image, title, author, date, reading time, category badge
- Rich typography, large readable content width, code blocks, quote blocks, bullet/numbered lists, inline images, previous/next navigation, share buttons (UI only)

3. Admin UI (Frontend Mockup Only):
- Sidebar: Dashboard, Blogs, Create Blog, Media, Settings
- Blog Editor mockup: Title, slug, category, author, drag-and-drop banner & thumbnail upload zones, photo attachment section, MDX editor area, preview and publish buttons

4. Landing Page:
- Hero: Linuxers logo, "Linuxers", subtitle "E-Cell of Mahalakshmi Tech", description, CTA "Explore Blogs", glowing effects
- About Linuxers: Innovation, entrepreneurship, technology, student community
- Vision & Mission: Two elegant cards with icons and descriptions
- Gallery: Responsive masonry/grid layout with hover zoom
- Our Activities: Attractive activity cards with clean empty-state design ready for future content
- Contact section: Modern contact cards for Instagram, LinkedIn, GitHub, Email, Website with glowing icons

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/f93c1e9b-ec4c-4bf8-9fd7-80789f37424b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
