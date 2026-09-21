# Linuxers frontend build

## What I’ll build
- A shared Linuxers site frame using the selected Editorial Laboratory direction, palette, and typography.
- A polished landing page with the requested introduction, about, vision and mission, gallery, activities, and contact areas.
- A searchable, category-filterable blog listing with realistic editorial cards.
- A long-form article page with rich reading styles, share controls, and previous/next navigation.
- A frontend-only admin workspace with a responsive sidebar, dashboard metrics, recent posts, and a detailed blog editor mockup.

## Interaction and responsiveness
- Make navigation, filters, search, mobile menus, admin navigation, editor fields, upload zones, preview, and publish feedback work locally without persistence.
- Ensure layouts scale from 320px phones through tablet and desktop without clipped text or stretched imagery.
- Use restrained lift, glow, and image motion with reduced-motion support.

## Technical details
- Create separate routes for `/`, `/blogs`, `/blogs/campus-innovation`, `/admin`, and `/admin/editor` with unique page metadata.
- Build shared navigation, footer, article cards, and admin shell components.
- Use the generated editorial photography as bundled visual assets; the uploaded palette remains a design reference only.
- Keep all data in frontend constants and component state; no backend, login, database, API, or CMS work.
- Verify the main public and admin views on desktop and mobile, then resolve any build or runtime issues.
