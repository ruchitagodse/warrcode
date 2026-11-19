# WARRCODE — Wear Your Code.

A separate Next.js 16 / React 19 frontend shopping demo for Toronto streetwear. The PROSPERA project at `C:\Ruchita\webdesign` was inspected read-only and remains untouched.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000. For production: `npm run build` followed by `npm start`.

## Architecture and audit

PROSPERA uses App Router, client components, CSS typography roles, responsive viewport rules and native dialog overlays. This demo adapts those patterns into an independent storefront. Its agency navigation, WebGL scene, GSAP, email API, analytics and server services were not copied. No SCSS utilities existed in the inspected source; Sass is the only added development dependency.

- `app/page.tsx`: storefront entry point.
- `app/layout.tsx`: page metadata and SCSS import.
- `app/globals.scss`: colour tokens, typography, reusable controls, product grids and responsive styles. Cream, charcoal and muted burgundy are the core palette; earthy accents come from the supplied photography. Motion respects reduced-motion preferences.
- `components/storefront/storefront.tsx`: homepage composition, filters, search, selected product and in-memory bag state.
- `components/storefront/product-card.tsx`: reusable product card.
- `components/storefront/modal.tsx`: native dialog with focus containment, Escape dismissal, focus restoration and body scroll lock.
- `components/storefront/icon.tsx`: local SVG interface icons.
- `lib/catalog.ts`: centralized assets, sample products, CAD formatter, order-message builder and client contact configuration.
- `public/images/`: optimized WebP derivatives. Original supplied JPEGs remain intact in `public`.

## Asset mapping

All visible photography and the wordmark come from supplied WARRCODE files. No external images or generated photography are used. Original filenames are retained as source assets; meaningful derivative filenames are used in the site.

- `logo.jpg` → `warrcode-logo.webp`: crop x110 / y115 / 500×110; header wordmark.
- `81700.jpg` → `code-tee.webp`: crop x0 / y155 / 432×650; black margins removed; hero, tee, women, social.
- `81699.jpg` → `toronto-coat.webp`: full image; hero, winterwear, coat and winter feature.
- `81698.jpg` → `statement-coat.webp`: full image; statement coat and social.
- `81697.jpg` → `espresso-coord.webp`: crop x0 / y0 / 418×790; left outfit panel; co-ord and social.
- `81695.jpg` → `everyday-sweatshirts.webp`: crop x0 / y210 / 432×540; black margins removed; men and sweatshirt campaign.
- `81696.jpg` → `winter-campaign.webp`: crop x0 / y210 / 432×540; black margins removed; social campaign.
- `81694.jpg` → `toronto-brand.webp`: crop x0 / y8 / 720×900; brand story.

Derivatives use WebP quality 90. Next Image adds responsive sizing, lazy loading and production image optimization. Photos retain their natural content; object-fit crops are used for consistent shopping ratios. The crew colour selector uses separate crops of the photographed rust and cream sweatshirts. Selecting a colour updates both the image and the canonical bag product, so equivalent colour selections merge correctly. These crops are low-resolution source details; no missing photography was generated.

## Included interactions

Category navigation, mobile menu, search by name/colour/category, quick view, size validation, colour selection for the supplied rust/cream sweatshirt, expandable sizing note, add to bag, item count, separate size/colour lines, quantity controls, removal, subtotal and product/bag WhatsApp enquiry generation. The bag resets on refresh by design. Add-to-bag opens the drawer and shows a visible, dismissible toast. A CAD $150 demo threshold drives the shipping progress bar, explicitly marked as a simulation. Proceed to Checkout opens a frontend-only review form with sample name, optional sample email and a required demo acknowledgement. Submission displays “Demo order placed successfully — no payment was processed.” and clears the bag. No form data is sent or stored. Native dialogs provide keyboard navigation and focus containment. The site includes category cards, winter feature, demo best-seller edit, brand story, social grid, support information and footer links.

## Client placeholders

All product names, prices, descriptions, sizing, category assignments and best-seller claims are demo content. Product composition, measurements, availability, taxes, shipping and return terms require confirmation. Supplied photography is real project input; it does not establish the final stock list or garment specifications.

Set `brand.whatsappNumber` in `lib/catalog.ts` to the verified international number (country code plus digits). The bag CTA then opens `wa.me` with the encoded order enquiry. Until configured, it shows an honest message preview and sends nothing. No payments, order database, shipping service or backend are implemented.

Set `brand.instagramUrl` to the verified official HTTPS profile URL. Until supplied, social buttons explain that the profile is pending. A domain has not been configured.

## Verification

ESLint and production build are run as delivery checks. Browser QA covers desktop, 768px tablet and 390px mobile layouts; category navigation; search; required size validation; cream/L variant selection; add to bag; quantity/subtotal changes; removal; empty bag; size information; and WhatsApp preview. Both desktop and mobile full shopping journeys reached the exact checkout confirmation and cleared the bag. Required checkout fields prevent early submission. The external WhatsApp destination and Instagram profile cannot be end-to-end verified until official contact values are provided.

## Deployment

This delivery is local source; nothing has been published. Deploy this directory as its own Next.js project, separate from PROSPERA. On Vercel, import this project, select Next.js, use `npm run build`, and accept the framework output default. For any Node-compatible host, install with `npm ci`, build with `npm run build`, then serve with `npm start` (configure the host port as required). No environment variables or credentials are needed. A Node.js version supported by the installed Next.js release is required. Connect the client's domain after purchase.


## Improvement sprint — supplied new assets

The full public folder was inspected, including both new originals. Neither original was overwritten:

- `t2.jpeg` (1080×1412): male model in a burgundy long-sleeve WARRCODE top. Full campaign → `men-burgundy-campaign.webp`; portrait crop x170/y220/610×1150 → `burgundy-long-sleeve.webp`.
- `WhatsApp Image 2026-11-19 at 17.38.10.jpeg` (1079×1418): three women wearing navy/ochre, charcoal/black and plum/orange checkerboard tees against the Toronto skyline. Full campaign → `women-checker-campaign.webp`; navy crop x215/y285/650×1080, charcoal crop x0/y320/330×790, plum crop x790/y400/289×730 → the three `checker-*.webp` images.
- Additional crops from existing photographs: `81695.jpg` → `rust-crew.webp` (x74/y368/164×323) and `cream-crew.webp` (x230/y358/195×351); `81697.jpg` → `espresso-trousers.webp` (x28/y364/377×424).

The 11 demo catalogue listings include photographed colourways, the existing complete co-ord and a clearly disclosed trouser-separates concept. They do not imply 11 independently verified garment designs or confirmed SKUs. New Arrivals and Best Sellers use separate explicit edit flags with no shared products by default. Collection filtering and All Pieces intentionally show the complete relevant selection; Best Sellers remains an independent homepage edit.

New components: `bag.tsx`, `checkout.tsx`, `size-guide.tsx`, `toast.tsx`. Changed components: `storefront.tsx`, `product-card.tsx`. Data and styling updates: `lib/catalog.ts`, `app/globals.scss`. No new dependencies were added during the sprint.

All Image instances have responsive sizes and descriptive alt text. Hidden mobile campaign imagery is no longer preloaded. Best Sellers no longer hides its third product on mobile. Programmatic scrolling respects reduced motion. Footer Size & Fit and Delivery & Returns have dedicated modals; no numeric sizing or real return terms are invented. The Instagram grid has four distinct supplied campaign images; every Instagram entry uses the single verified-profile configuration or an honest pending-profile modal.

Catalogue integrity checks pass: 11 unique IDs, 11 distinct image paths, all mapped files present, non-overlapping featured edits, descriptive alt text and correct variant/CAD enquiry totals. ESLint and production build pass. Browser checks cover desktop, 768px tablet and 390px mobile; collection filters; product WhatsApp preview; missing-size validation; colour/image selection; visible toast; repeated-add merging; quantity/subtotal/threshold synchronization; removal; empty bag; checkout validation; confirmation; and support/social placeholders. No browser warnings/errors were observed in the final interaction checks.

### Vercel root-directory error

The earlier `Couldn't find any pages or app directory` message means the deployment build input/root did not contain the application directory. This local checkout contains `app/page.tsx` and `app/layout.tsx`, and its production build succeeds. Ensure the uploaded/pushed source contains `app`, `components`, `lib` and `public`, not only package/config files. If this project is the repository root, leave Vercel Root Directory empty; if the repository contains this project in a subfolder, set Root Directory to that actual repository-relative folder. Build Command is `npm run build`; framework output uses Next.js defaults. Local uncommitted/untracked files are not included in a Git-based deployment until committed and pushed. This workspace has no Git remote configured, so the Vercel source/root setting cannot be verified here.

## Premium animation enhancement

Motion-only styling lives in `app/motion.scss`; `components/storefront/motion.tsx` provides one-shot IntersectionObserver reveals, staggered product grids and a desktop-only winter parallax update scheduled with requestAnimationFrame. Parallax pauses offscreen and is disabled on touch/mobile and for reduced-motion preferences. The hero uses a cinematic image reveal, gentle scale settling, staggered words and delayed supporting text/buttons without changing its dimensions.

Native dialogs retain focus containment through short fade/scale or drawer entrance/exit transitions. Escape/backdrop/close controls restore body scrolling after dismissal. Bag removals update state immediately; an inert, aria-hidden visual copy supplies the exit animation and is removed on completion. Quantity/subtotal feedback, cart badge, buttons, underlines, quick view and toast transitions use existing browser APIs/CSS. No dependencies, assets or catalogue data were added or changed for this enhancement. No genuine alternate-angle photos or wishlist controls exist in the current implementation, so no alternate product imagery or new wishlist feature was invented.

Validation: ESLint and production build pass; desktop product/colour selection, quantity changes, removal, empty bag, Escape dismissal and checkout confirmation pass; mobile drawer/collection/product/bag checks show no horizontal overflow. Reveal timing and desktop winter parallax were checked in the browser. Targeted reduced-motion removal and missing-element fallback checks pass. Reduced-motion CSS suppresses entrances, parallax and hover movement; content remains visible without JavaScript. A pre-existing development LCP hint remains for the right hero image; production compilation is successful. Motion preview: `warrcode-motion-preview.jpg`.
