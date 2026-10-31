# Al-Habib Production Group — Premium Website Rebuild

**Master Build Prompt & Development Plan**

Prepared by **Micro**smart Technology Solutions · *Smart Solutions. Better Future.* · www.Microsmart.af

Date: October 31, 2026 · Target site: https://al-habibgroup.com/ · Languages: English, Dari (دری), Pashto (پښتو)

---

## 1. How to use this document

1. **Section 2** is the audit of the current site, so you and the client agree on what exists today.
2. **Section 3** is the creative direction and positioning for the pitch.
3. **Section 4** is the **Master Prompt**. Copy everything between `BEGIN MASTER PROMPT` and `END MASTER PROMPT` into Claude Code (or any coding agent) as the project brief. The prompt is written to be executed **phase by phase**: tell the agent to run "Phase 0 only" first, review, then continue.
4. **Section 5** is the development plan: phases, timeline, effort, and a suggested budget allocation for a USD 10,000 delivery.
5. **Section 6** is the QA and acceptance checklist, and **Section 7** is the list of inputs you must collect from the client before design starts.

> Scope note: only the homepage was readable when this audit was produced. The inner pages (About, Water Tank Simple/Standard, Bottle, Pipes, Ballers, Gallery, Contact) must be audited at kickoff and their content merged into the CMS seed.

---

## 2. Current website audit

### 2.1 Content inventory (preserve, then improve)

| Area | What the site says today |
| --- | --- |
| Company | Al-Habib Production Group, Kabul, Afghanistan. Described as established in 2025, a modern plastic manufacturer with high-precision machinery and an experienced technical and production team |
| Hero | "Plastic Tanks, Best and Strong Water Tanks in Afghanistan, PPRC Pipes & Custom Plastic Products"; badge "100% Premium"; promo "5% OFF Bulk Sale" |
| Product lines | Plastic water tanks 500 L to 5,000 L (listing also shows 200 L and 300 L), PPRC pipes, bottles, 220-liter ballers, bushings, hair shampoo products |
| Tank variants | Bottle Tank and Capsule Tank shapes; navigation splits Water Tank into Simple and Standard |
| Listed best sellers | 200, 300, 500 (bottle and capsule), 800, 1000 (bottle and capsule), 1500 (bottle and capsule), 2000 liter tanks |
| Prices shown | Only two: 800 L bottle = 3800 and 1000 L bottle = 4800 (currency not stated). All others show "#" |
| Value props | Premium Quality (multi-layer HDPE), Eco-Friendly, Fast Delivery (door delivery, no minimum order), Certified (NSF and IBWA standards stated) |
| Guarantee | 25-year guarantee on water tanks |
| Testimonials | Farid Jamal (Farah Province), Naved Ahmad (Herat, wholesaler buying in bulk). The Farid Jamal entry is duplicated |
| Gallery | 6 images on the homepage, with a full Gallery page |
| Navigation | Home, About, Water Tank (Simple, Standard), Bottle, Pipes, Ballers, Gallery, Contact |
| Contact | Kabul, Afghanistan; WhatsApp +93 766662622; contact@al-habibgroup.com |
| Social | Facebook, TikTok, YouTube, Instagram, Telegram |
| SEO | Title "Al-Habib Production Group \| Plastic Water Tanks & PPRC Pipes in Afghanistan"; Google Search Console verification tag present; meta keywords already include Dari and Pashto terms (تانکی، تانکر، ټانکر، ذخیره آب، پلاستیکی تانکر) |

### 2.2 Problems the rebuild must solve

- English-only experience, while the keyword list and the real customer base are Dari and Pashto speaking.
- Product cards all link to one generic `/water_tank` page. There are no product detail pages, no specs, no dimensions, no comparison.
- Most prices are "#" and several "Read More" and "Contact Us" buttons point to `#`.
- No quote request flow, no dealer or distributor finder, no bulk-order flow. WhatsApp is the only conversion path.
- Duplicate testimonial, no video proof, no factory or process storytelling.
- Flat static layout: no motion, no 3D, no product visualization.
- Footer quick links are incomplete (no Pipes, Bottle, Ballers, Gallery).
- Minor copy issues (for example "All Rigths Reserved"), and an external developer credit that should be reviewed with the client.
- Keyword-stuffed meta keywords instead of real localized page content.

### 2.3 Claims that must be verified with documents before launch

The new site will make these prominent. Get proof from the client, or soften the wording:

1. NSF and IBWA compliance (obtain certificates or test reports; otherwise reword).
2. The 25-year guarantee: exact terms, exclusions, and how a claim is made.
3. "Eco-friendly" and "multi-layer HDPE": layer count, material grade, recycled content.
4. Currency and unit of the listed prices (assumed AFN, unconfirmed), and the rules for the 5% bulk discount (minimum quantity, validity).
5. Delivery coverage: which provinces, and what "fast" means.

---

## 3. Creative direction

**Concept: "Water, engineered."** Afghanistan's water-storage brand that feels like a global industrial leader: precise, clean, trustworthy, and alive with motion.

**Positioning:** from "a catalog of tanks" to "the most trusted way to store clean water in Afghanistan", with proof (factory, materials, warranty, certificates) and an easy way to buy (quote, WhatsApp, dealer).

**Signature experiences (these are what make it feel like a premium build):**

1. **Scroll-driven 3D hero:** a translucent tank in the center; water level rises as the visitor scrolls, with a gentle caustic shimmer. Labels (capacity, warranty, layers) appear at fill milestones.
2. **Exploded-layer view:** the tank wall separates into its layers on scroll to explain multi-layer HDPE (copy only after the client confirms the layer specs).
3. **Tank Selector:** the visitor answers "how many people / what use" and the site recommends a capacity, with an animated tank filling to that size.
4. **Product configurator:** switch Bottle / Capsule shape, capacity, and color; the 3D model morphs; one tap sends a quote request or a prefilled WhatsApp message in the active language.
5. **Liquid page transitions:** a wave wipe between routes.
6. **Interactive Afghanistan dealer map:** 34 provinces, hover or tap to see distributors and delivery coverage.
7. **Factory story:** pinned storytelling from raw material to finished tank to delivery, with counters (units produced, provinces served, warranty years) once the client supplies real numbers.
8. **Full trilingual experience:** English (LTR), Dari (RTL), Pashto (RTL). Layout, motion direction, typography, numerals, dates and SEO are all localized, not just the text.

**Proposed palette (derive final values from the real logo at kickoff; these are placeholders):** deep ocean navy `#06182F`, water blue `#0B6BCB`, aqua highlight `#22D3EE`, clean white `#FFFFFF`, soft mist `#EAF4FB`, conversion accent amber `#F5A524`.

---

## 4. MASTER PROMPT

**BEGIN MASTER PROMPT**

---

### 4.1 Role and objective

You are a principal creative engineer and technical lead. Build a production-grade, award-level marketing and catalog website for **Al-Habib Production Group** (https://al-habibgroup.com/), an Afghan plastic manufacturer based in Kabul producing HDPE water tanks, PPRC pipes, bottles, 220-liter ballers, bushings and hair shampoo products. The existing site is a static English-only brochure. The new site must feel like a USD 10,000+ custom build: cinematic motion, 3D product visualization, interactive tools, a CMS the client can operate, and complete **English, Dari and Pashto** localization with true RTL support.

Business goals, in priority order:

1. Generate qualified leads: WhatsApp clicks, quote requests, dealer inquiries, bulk-order inquiries.
2. Build trust: certifications, warranty, factory proof, testimonials, delivery coverage.
3. Rank for water-tank and PPRC-pipe searches in Dari, Pashto and English within Afghanistan.
4. Let non-technical staff manage products, prices, gallery, testimonials, promotions and translations without a developer.

Non-goals: full e-commerce checkout and online payments (the model is **request a quote** and **order via WhatsApp**). Design the data model so checkout can be added later.

### 4.2 Working rules (apply to every phase)

- Work in **phases**. At the end of each phase, stop, summarize what you built, list open questions and risks, and wait for approval. Never start the next phase on your own.
- **Never invent business facts.** Specs, certifications, prices, counts, addresses and testimonials come from the CMS seed file or are marked `TODO_CLIENT_CONFIRM` and shown as a visible placeholder in development only. Never ship fabricated statistics.
- Every user-facing string lives in translation files or localized CMS fields. **No hard-coded copy in components.**
- Use **logical CSS properties** everywhere (`margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start`). Physical `left/right` is allowed only with a comment explaining why.
- Respect `prefers-reduced-motion` and low-power devices everywhere. Every animation has a static fallback.
- Prefer boring, maintainable code and strict TypeScript. No `any`, no dead code, no unused dependencies.
- Commit in small conventional commits. Keep a `DECISIONS.md` log of architecture choices.

### 4.3 Tech stack (use these unless you can justify a change in `DECISIONS.md`)

| Layer | Choice |
| --- | --- |
| Framework | Next.js (App Router, current stable) with React and TypeScript in strict mode |
| Styling | Tailwind CSS with design tokens as CSS variables; `tailwindcss-logical` utilities or native logical utilities |
| i18n | `next-intl` with locale-prefixed routes `/en`, `/fa`, `/ps` |
| Scroll and animation | GSAP + ScrollTrigger for scroll choreography, Lenis for smooth scrolling, Motion (Framer Motion) for component and layout transitions |
| 3D | React Three Fiber + drei + three, **lazy-loaded**, with GLB models compressed using Draco or Meshopt and KTX2 textures |
| Sliders | Embla Carousel (supports RTL direction) |
| CMS | Payload CMS (self-hosted, TypeScript, built-in field-level localization, admin UI supports RTL) on PostgreSQL. Acceptable alternative: Sanity with localized fields |
| Forms | React Hook Form + Zod, server-side validation, Cloudflare Turnstile + honeypot, rate limiting |
| Maps | Inline SVG map of Afghanistan's 34 provinces (no Google Maps dependency for the main map) |
| Media | `next/image` with AVIF/WebP, responsive sizes, blur placeholders; video as WebM + MP4, poster always provided |
| Email and alerts | Transactional email for new leads plus optional Telegram bot notification to the sales team |
| Analytics | Privacy-friendly analytics (Plausible or GA4) with custom events listed in 4.12 |
| Hosting | Docker on a VPS behind Cloudflare CDN, Caddy or Nginx reverse proxy, automated Postgres and media backups |
| Quality | ESLint, Prettier, Playwright (E2E), Lighthouse CI, axe-core, GitHub Actions CI |

### 4.4 Repository structure

```
/apps/web            Next.js frontend
/apps/cms            Payload CMS (collections, access control, seed)
/packages/ui         Shared components, tokens, motion primitives
/packages/i18n       Message catalogs (en, fa, ps), glossary, formatters
/assets/3d           Source and optimized GLB tank models
/docs                DECISIONS.md, CONTENT_GUIDE.md, TRANSLATION_GUIDE.md, RUNBOOK.md
/scripts             Seed, image optimization, hreflang and sitemap checks
```

### 4.5 Sitemap and information architecture

Preserve all current sections, improve naming, and add conversion pages. Each page exists in all three locales.

| Route (per locale) | Purpose |
| --- | --- |
| `/` | Home: cinematic hero, product categories, tank selector teaser, why Al-Habib, factory story, best sellers, certificates, testimonials, dealer teaser, gallery, final CTA |
| `/about` | Company story, mission, machinery, quality control process, team, timeline |
| `/products` | Catalog hub with filters (category, capacity, shape, use) and comparison |
| `/products/water-tanks` | Tank listing; filters for Simple vs Standard, Bottle vs Capsule, capacity |
| `/products/water-tanks/[slug]` | Product detail: 3D viewer, gallery, specs table, dimensions, warranty, FAQs, related products, Request Quote and WhatsApp CTAs |
| `/products/pprc-pipes`, `/products/bottles`, `/products/ballers` | Category pages plus detail pages. Bushings and shampoo live under an "Other products" category until the client decides |
| `/tank-selector` | Interactive capacity recommender |
| `/quote` | Quote request cart and form (multi-product) |
| `/dealers` | Interactive province map, dealer directory, "become a dealer" form |
| `/quality` | Materials, certifications, testing, warranty terms and claim process |
| `/gallery` | Masonry gallery with lightbox, video tab, and category filters |
| `/news` (optional) | Updates and educational articles (for example how to choose a water tank), good for SEO |
| `/contact` | Contact form, WhatsApp, phone, email, address, embedded map link, working hours |
| `/legal/privacy`, `/legal/terms` | Required legal pages |

**Redirects:** the old routes `/about_us`, `/water_tank`, `/water_tank_simple`, `/water_tank_standard`, `/bottle`, `/pipes`, `/ballers`, `/gallery`, `/contact` must 301 to the new localized equivalents (default locale) so existing SEO is preserved.

### 4.6 Design system

**Tokens (CSS variables, light theme first, dark hero sections allowed):**

- Colors: navy `#06182F`, water blue `#0B6BCB`, aqua `#22D3EE`, mist `#EAF4FB`, white, accent amber `#F5A524` for primary CTAs only. Replace with colors sampled from the official logo at kickoff, and keep contrast at WCAG 2.2 AA.
- Radius scale: 8, 16, 24, 32. Shadow scale: soft, lifted, glow (aqua).
- Spacing scale on a 4px base; fluid type using `clamp()`.
- Motion tokens: durations (150, 300, 600, 1000, 1600 ms), easings (`power3.out`, `expo.inOut`, a custom "water" cubic-bezier), and stagger values.

**Typography:**

- Latin: a modern geometric display face (for example Sora or Plus Jakarta Sans) paired with Inter for body. Self-host with `next/font`, subset, `font-display: swap`.
- Arabic script (Dari and Pashto): **Vazirmatn** as primary, with **Noto Naskh Arabic** and **Noto Sans Arabic** as fallbacks. Run the glyph test in 4.8 and pick the face that renders every Pashto letter correctly. Self-host and subset.
- Arabic-script rules: line-height 1.8 to 2.0 for body; **no letter-spacing** (it breaks letter joining); no uppercase or italic transforms; slightly larger base size than Latin (about +1 to +2px) for equal visual weight; weights limited to 400, 500, 700 where the font allows.

**Core components:** Header with a language switcher (EN / دری / پښتو) and sticky quote button, mega-menu for products, Footer, Button (primary, secondary, ghost, magnetic hover), ProductCard (3D tilt on hover, with a static fallback on touch), SpecTable, Badge, Counter, Marquee, Accordion, Tabs, Modal, Lightbox, Toast, FormField with RTL-aware validation messages, SectionHeading with animated underline, and a persistent floating WhatsApp button.

**Signature motion primitives (build once in `/packages/ui`):** `RevealOnScroll`, `SplitTextReveal` (see the Arabic-script exception in 4.7), `WaterWipeTransition`, `MagneticButton`, `ParallaxLayer`, `PinnedStory`, `CounterOnView`, `TiltCard`, `BubbleField` (a lightweight canvas of rising bubbles for section backgrounds).
