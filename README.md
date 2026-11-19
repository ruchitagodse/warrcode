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

Derivatives use WebP quality 90. Next Image adds responsive sizing, lazy loading and production image optimization. Photos retain their natural content; object-fit crops are used for consistent shopping ratios. The crew uses the supplied two-colour campaign image, so selecting Rust or Cream updates the order variant while keeping both photographed colours visible. There are no separate colour-angle photographs.

## Included interactions

Category navigation, mobile menu, search by name/colour/category, quick view, size validation, colour selection for the supplied rust/cream sweatshirt, expandable sizing note, add to bag, item count, separate size/colour lines, quantity controls, removal, subtotal and WhatsApp enquiry generation. The bag resets on refresh by design. Native dialogs provide keyboard navigation and focus containment. The site includes category cards, winter feature, demo best-seller edit, brand story, social grid, support information and footer links.

## Client placeholders

All product names, prices, descriptions, sizing, category assignments and best-seller claims are demo content. Product composition, measurements, availability, taxes, shipping and return terms require confirmation. Supplied photography is real project input; it does not establish the final stock list or garment specifications.

Set `brand.whatsappNumber` in `lib/catalog.ts` to the verified international number (country code plus digits). The bag CTA then opens `wa.me` with the encoded order enquiry. Until configured, it shows an honest message preview and sends nothing. No payments, order database, shipping service or backend are implemented.

Set `brand.instagramUrl` to the verified official HTTPS profile URL. Until supplied, social buttons explain that the profile is pending. A domain has not been configured.

## Verification

ESLint and production build are run as delivery checks. Browser QA covers desktop, 768px tablet and 390px mobile layouts; category navigation; search; required size validation; cream/L variant selection; add to bag; quantity/subtotal changes; removal; empty bag; size information; and WhatsApp preview. The external WhatsApp destination and Instagram profile cannot be end-to-end verified until official contact values are provided.

## Deployment

This delivery is local source; nothing has been published. Deploy this directory as its own Next.js project, separate from PROSPERA. On Vercel, import this project, select Next.js, use `npm run build`, and accept the framework output default. For any Node-compatible host, install with `npm ci`, build with `npm run build`, then serve with `npm start` (configure the host port as required). No environment variables or credentials are needed. A Node.js version supported by the installed Next.js release is required. Connect the client's domain after purchase.
