# Linuxers Light Galaxy Theme

## Direction
Apply the selected **Pearlescent Nebula Editorial** treatment across the existing site. All words, images, sections, card positions, spacing, dimensions, navigation, breakpoints, and functionality remain unchanged.

## Theme work
- Replace the current silver-blue styling with a luminous pearl and pale-silver galaxy canvas.
- Use deep navy ink for primary text, softer slate for secondary text, and restrained violet, indigo, cyan, and teal spectral accents.
- Refine existing glass surfaces with translucent white layers, crisp hairline borders, subtle iridescent edge light, and nuanced shadows.
- Rework the existing star field into a delicate star-atlas texture with restrained nebular light, avoiding blobs, literal planets, or dark dominant areas.
- Carry the same visual language through the header, footer, blog cards, article reader, forms, upload areas, dashboard, editor, media library, settings, empty states, badges, and notifications.
- Keep Space Grotesk and DM Sans unchanged.

## Interaction finish
- Add precise hover, focus, pressed, and selected states using spectral edge illumination and subtle depth changes.
- Preserve the existing card lift and image zoom while making transitions smoother and less template-like.
- Add fine star-glint and border-sheen motion only where it does not alter geometry or distract from reading.
- Preserve keyboard focus visibility and disable decorative motion when reduced motion is requested.

## Scope safeguards
- No copy changes.
- No content additions or removals.
- No layout, spacing, sizing, image, or responsive breakpoint changes.
- No route, state, or behavior changes beyond visual interaction feedback.
- No backend work.

## Technical implementation
- Update semantic color, shadow, surface, and galaxy-effect tokens in the global theme stylesheet.
- Refine shared theme utilities and shared button styling so all pages inherit the treatment consistently.
- Keep existing semantic class usage wherever possible; touch page/component classes only when a theme state cannot be expressed centrally.
- Correct the existing shared button export/ref typing errors without altering its appearance or behavior, so validation can complete.

## Verification
- Check the homepage, blog listing, article page, dashboard, editor, media library, settings, and shared navigation.
- Verify desktop and 320px mobile rendering for unchanged geometry, readable contrast, intact interactions, and no clipping or overflow.
- Confirm the final preview builds cleanly and has no runtime errors.
