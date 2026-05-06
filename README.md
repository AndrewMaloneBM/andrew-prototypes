# Andrew's Prototypes — Seller XP

Andrew Malone's personal sandbox for Back Market **Seller XP** prototypes. Built with Nuxt 4 + Vue 3 + Tailwind CSS, wired up with real Revolve design system tokens, fonts, and icons. The team-shared version lives at [`AndrewMaloneBM/BackMarket-SellerXP`](https://github.com/AndrewMaloneBM/BackMarket-SellerXP).

**Live hub:** https://andrewmalonebm.github.io/andrew-prototypes/
**External share base:** https://andrewmalonebm.github.io/andrew-prototypes/share/

---

## Table of contents

1. [Who this is for](#who-this-is-for)
2. [Stack](#stack)
3. [Getting started](#getting-started)
4. [Two prototype patterns](#two-prototype-patterns)
5. [Creating a prototype](#creating-a-prototype)
6. [Registering on the hub](#registering-on-the-hub)
7. [Branching and contribution workflow](#branching-and-contribution-workflow)
8. [Deploy](#deploy)
9. [Sharing with stakeholders](#sharing-with-stakeholders)
10. [Revolve design system](#revolve-design-system)
11. [Shared components](#shared-components)
12. [Conventions](#conventions)
13. [Do's and don'ts](#dos-and-donts)

---

## Who this is for

This repo is **Andrew's personal exploration sandbox** for Seller XP work. It exists because high-fidelity code prototypes get feedback faster and more accurately than Figma alone — especially for complex back-office flows where state, interaction, and real data matter. The team-shared version (where the squad collaborates) lives at `AndrewMaloneBM/BackMarket-SellerXP`.

Prototypes here are **not production code**. They are throwaway explorations that help align design decisions before engineering builds. Once a direction is chosen and handed off, the prototype is archived, not deleted.

---

## Stack

| Layer | Tech |
|---|---|
| Framework | Nuxt 4 + Vue 3 (Composition API, `<script setup>`) |
| Styling | Tailwind CSS via `@nuxtjs/tailwindcss` |
| Design system | Back Market **Revolve** — real tokens, fonts, and icons |
| Dev server | `npm run dev` — port 3030 |
| Deploy | GitHub Pages via GitHub Actions (auto-deploys on push to `main`) |

**Key config files:**

- `nuxt.config.ts` — minimal; handles baseURL for GitHub Pages
- `tailwind.config.ts` — Revolve colour tokens, fonts, border radii
- `assets/css/main.css` — base component classes (`.btn`, `.card`, `.badge-*`)
- `app/app.config.ts` — team name, designer name, slug (update on first clone)

---

## Getting started

```bash
# 1. Clone
git clone https://github.com/AndrewMaloneBM/andrew-prototypes.git
cd andrew-prototypes

# 2. Install
npm install

# 3. Configure (first time only)
# Open app/app.config.ts and set your name in designerName

# 4. Start dev server
npm run dev
# → http://localhost:3030
```

The hub at `/` lists all registered prototypes. Every prototype file under `app/pages/prototypes/` is its own self-contained Vue component.

---

## Two prototype patterns

There are two types of prototype in this repo. Use the right one for the job.

### Pattern 1 — Concept explorer (multi-concept comparison)

Use for: **exploring 2–4 design directions side-by-side**, letting stakeholders switch between concepts and walk through a full state tree.

**Example:** `app/pages/prototypes/money-tab.vue` (BackFunds)

What it includes:
- `PrototypeSidebar` — collapsible dark sidebar with concept switcher, page/sub-state navigator, pros/cons, and success metrics
- `BmShell` — the full BM back-office shell (header + nav + sub-tabs)
- A `conceptMeta` array that drives everything in the sidebar
- Concepts rendered with `v-show` (not `v-if`) so state persists when switching
- A `shareMode` computed that strips the sidebar for clean external links

**When to use it:** You have more than one design direction to compare, you need to walk through a multi-step flow, or you're presenting to a PM or engineering for a structured review.

---

### Pattern 2 — Simple prototype page

Use for: **quick single-concept explorations**, utility pages, or anything that doesn't need the full sidebar apparatus.

What it includes:
- A minimal breadcrumb bar (← Hub / Prototype name / date)
- A blank content area
- No sidebar, no concept switcher

**When to use it:** You're exploring a single idea quickly, mocking up one screen, or you don't need stakeholders to compare alternatives.

---

## Creating a prototype

### Simple page

```bash
npm run new-prototype -- "my-prototype-name"
```

This scaffolds `app/pages/prototypes/my-prototype-name.vue` using the simple pattern. It also prints a reminder to register it in the hub.

Then [register it on the hub](#registering-on-the-hub).

---

### Concept explorer

Copy the explorer template manually and rename it:

```bash
cp app/pages/prototypes/_template.vue app/pages/prototypes/my-prototype.vue
```

Open the file and:

**1. Set the sidebar title:**
```html
<PrototypeSidebar title="Your Prototype Title" .../>
```

**2. Fill in `conceptMeta`** — each entry is one concept:

```ts
const conceptMeta: readonly PrototypeConcept[] = [
  {
    name: 'Concept A',              // Shown in sidebar concept switcher pill
    prdFeature: 'PRD X.X — Name',   // PRD section this maps to
    prdMetric: 'Success metric.',    // KPI shown in sidebar
    pros: ['Why this direction works'],
    cons: ['What it sacrifices'],
    pages: [
      {
        id: 'page-id',              // Used internally for state routing
        label: 'Page name',         // Shown in sidebar page list
        navItem: 'Money',           // Highlights this nav item in BmShell
        changes: ['What changed on this page vs baseline'],
        subStates: [                // Optional — for pages with multiple states
          { id: 'state-id', label: 'State label' },
        ],
      },
    ],
  },
]
```

**3. Add concept blocks:**
```html
<div v-show="activeConcept === 1">
  <!-- Concept A content — use BmShell for the back-office chrome -->
</div>

<div v-show="activeConcept === 2">
  <!-- Concept B content -->
</div>
```

**Tip:** If you're building a complex multi-step flow, use `money-tab.vue` as your starting point rather than the blank template. Strip the BackFunds-specific content and keep the skeleton.

---

## Registering on the hub

After creating a prototype, add an entry to the `inProgress` array in `app/pages/index.vue`:

```ts
{
  title: 'Full descriptive title — use the PRD title if there is one',
  description: 'One paragraph. What is the problem, what does this prototype explore?',
  problemStatement: 'One sentence. The insight that motivates the work.',
  author: 'Your Name',
  date: 'Month YYYY',
  status: 'In progress',
  concepts: [
    { n: 1, name: 'Concept A', pages: ['Home', 'Money'] },
    { n: 2, name: 'Concept B', pages: ['Money'] },
  ],
  scope: 'Home, Money',
  goal: 'One-line success target',   // e.g. "Lift adoption from 11% to 40%"
  impact: 'The business number',     // e.g. "€1.4M potential"
  link: '/prototypes/your-prototype-name',
  accent: '#D4860A',                 // Hub card accent colour (pick from Revolve palette)
},
```

Move entries to `shipped` once the direction is chosen and handed off to engineering.

---

## Branching and contribution workflow

### Branch naming

```
feat/prototype-name           New prototype from scratch
update/prototype-name-thing   Changes to an existing prototype
fix/prototype-name-bug        Fixing a broken state or interaction
infra/what-you-changed        Changes to shared components, config, or deploy
```

### When you need a PR (and when you don't)

**Direct push to `main` is fine for:**
- Changes inside your own prototype file (`app/pages/prototypes/your-file.vue`)
- Registering your prototype in `index.vue` (adding to the `inProgress` array)

These are isolated by design and won't affect anyone else's work.

**Always open a PR with at least one reviewer for:**

| File | Why it needs a review |
|---|---|
| `app/components/PrototypeSidebar.vue` | Powers every concept explorer |
| `app/components/BmShell.vue` | The back-office shell used everywhere |
| `app/composables/usePrototypeSidebar.ts` | Shared sidebar state logic |
| `tailwind.config.ts` | Global design tokens |
| `assets/css/main.css` | Global base styles |
| `nuxt.config.ts` | Build and routing config |
| `.github/workflows/deploy.yml` | Deploy pipeline |
| `app/pages/index.vue` | Hub landing page (structural changes only) |

The rule: if breaking this file would break someone else's prototype, open a PR.

### PR title format

```
feat(prototype-name): short description
update(shared): what changed in shared files
fix(prototype-name): what was broken
infra: what infrastructure changed
```

### Commit format

Keep commits small and scoped to one logical change:

```
feat: add denied application state to BackFunds C2
update: redesign consent step with scrollable legal document box
fix: consent checkbox not resetting on concept switch
```

---

## Deploy

### How it works

Pushing to `main` automatically triggers the GitHub Actions workflow (`.github/workflows/deploy.yml`):

1. `nuxt generate` — builds a fully static site with `NUXT_APP_BASE_URL=/andrew-prototypes/`
2. The output is deployed to the `gh-pages` branch
3. GitHub Pages serves `gh-pages` at the live URL

Deploys take ~2 minutes. Watch progress at: `github.com/AndrewMaloneBM/andrew-prototypes/actions`

### Adding a new share route

If your prototype uses a `/share/` alias, add it to `nitro.prerender.routes` in `nuxt.config.ts`:

```ts
nitro: {
  prerender: {
    routes: ['/share/backfunds', '/share/your-prototype'],
  },
},
```

Without this, the share URL won't exist in the static build.

### Preview the static build locally

```bash
NUXT_APP_BASE_URL=/andrew-prototypes/ npx nuxt generate
npx serve .output/public
```

---

## Sharing with stakeholders

### Internal (full prototype with sidebar)

Share with the BM team — includes the sidebar, concept switcher, pros/cons, and all design rationale.

```
https://andrewmalonebm.github.io/andrew-prototypes/prototypes/money-tab
```

### External (clean view, no sidebar)

For external partners (e.g. Storfund) or presentations where you don't want the design process visible, use the `/share/` URL. This strips the sidebar and shows a clean prototype view.

```
https://andrewmalonebm.github.io/andrew-prototypes/share/backfunds
```

**To add a share URL to your prototype:**

```ts
// In definePageMeta:
definePageMeta({ layout: false, alias: ['/share/your-prototype-name'] })

// In script setup:
const shareMode = computed(() => route.path.startsWith('/share/'))
```

Then conditionally hide the sidebar: `:share-mode="shareMode"` on `PrototypeSidebar`.

Don't forget to add the route to `nuxt.config.ts` → `nitro.prerender.routes`.

---

## Revolve design system

Full guidelines live at `design-system/` in this repo. Start with `design-system/Guidelines.md`.

### Colour tokens

```
bm-gray-50 → bm-gray-900    Neutral grey scale (raw.grey)
bm-surface                   Page/section background
bm-text-hi                   High-emphasis text
bm-text-mid                  Secondary text
bm-text-low                  Caption / tertiary text
bm-border                    Default border colour
bm-success                   Success green
```

For values not covered by Tailwind tokens, check `design-system/foundations/` for the raw palette.

### Typography

All three fonts are self-hosted in `public/fonts/` — no Google Fonts dependency.

| Class | Font | Use for |
|---|---|---|
| `font-heading-primary` | IvarSoft (serif) | h1, hero headlines, punchlines |
| `font-heading-secondary` | BMDupletDSP (display) | h2, h3, card titles |
| `font-body` | BMDupletTXT (body sans) | All UI text, labels, captions (default) |

`font-display` has been removed from the config — don't use it.

### Border radius

```
rounded-bm-xs   2px
rounded-bm-sm   6px
rounded-bm      8px
rounded-bm-lg   12px
```

### Icons

402 Revolve SVG icons live in `public/icons/`. Find names in `design-system/icons/icons.json`.

```html
<!-- Standard usage -->
<RevIcon name="IconName" class="w-4 h-4" />

<!-- When you need Tailwind text-* colour inheritance, use inline SVG instead -->
<!-- RevIcon renders as <img> and won't inherit currentColor -->
```

---

## Shared components

### `BmShell`

The full BM back-office shell — header, 9-item main nav, and sub-tabs. Use this in every concept explorer.

```html
<BmShell
  active-nav="Money"
  :tabs="['Your wallet', 'Past invoices', 'Daily payout']"
  active-tab="Daily payout"
>
  <!-- Page content goes here -->
</BmShell>
```

### `PrototypeSidebar`

The collapsible dark sidebar. Drives concept switching, page navigation, sub-state tracking, and the detail zone (What's new / Pros / Cons / Metric). See `_template.vue` for the full prop and event list.

The `:dropped-concepts` prop takes an array of concept numbers (e.g. `[3, 4]`) — those concepts appear greyed out and are hidden in share mode.

### `RevIcon`

Thin wrapper around the Revolve icon SVGs.

```html
<RevIcon name="IconName" class="w-5 h-5 text-gray-500" />
```

---

## Conventions

### File naming

```
app/pages/prototypes/my-prototype.vue   kebab-case, descriptive
```

Dates belong in the hub registration (`date: 'April 2026'`), not in filenames.

### Sub-state IDs

Sub-state `id` values must be unique within a concept's page but can repeat across concepts. `'step-1'` can appear in C1, C2, C3, and C4 — the sidebar scopes them per concept automatically.

### Modal and overlay positioning

**Never deviate from this pattern:**

```html
<!-- Outer wrapper — constrains all modals to the prototype area -->
<div class="relative overflow-hidden">

  <!-- Scrollable content -->
  <div class="absolute inset-0 overflow-y-auto">
    <!-- page content -->
  </div>

  <!-- Modals are siblings of the scroll div, never inside it -->
  <div v-if="showModal" class="absolute inset-0 z-50 bg-white">
    <!-- modal content -->
  </div>

</div>
```

Never use `Teleport to="body"` or `position: fixed`. The prototype shell is fully self-contained.

### `v-show` vs `v-if` for concepts

Always `v-show` when switching between concepts — keeps all concept trees mounted so tab state, scroll position, and dismissed UI persists when a stakeholder switches between concepts.

### Hotspot highlighting

Any interactive element that isn't obviously clickable should get the `prototype-hotspot` class. Clicking anywhere on the prototype flashes all hotspots blue for one second.

```html
<button class="prototype-hotspot ...">Apply</button>
```

### Placeholder copy

Prefix placeholder content with `✏️` so it's obvious during reviews:

```
✏️ Legal text — to be provided by the legal team
✏️ Reapplication window — confirm with Storfund Thursday
```

---

## Do's and don'ts

### Do

- **Work on a branch** for anything touching shared components or config files
- **Register your prototype on the hub immediately** — even at day one, `status: 'In progress'`
- **Use Revolve tokens** for every colour, spacing, radius, and font — check `design-system/` when in doubt
- **Archive, don't delete** — mark dropped concepts with `DROPPED_CONCEPTS` so the rationale is preserved for stakeholder reviews
- **Prefix placeholder copy with `✏️`** — makes it impossible to miss in a review
- **Use the share URL for external stakeholders** — never send the full internal URL to partners
- **Push to `main` after every meaningful change** — GitHub Actions deploys automatically; don't sit on local changes for days

### Don't

- **Don't push shared component changes directly to `main`** — open a PR
- **Don't hardcode hex colours** unless the exact Revolve token isn't in Tailwind
- **Don't use `font-display`** — it's been removed from the Tailwind config
- **Don't use `position: fixed` or `Teleport`** for modals — it breaks the prototype shell layout
- **Don't use `v-if` for concept switching** — use `v-show`
- **Don't over-engineer** — it's a prototype, not production code. Three similar lines of HTML is fine
- **Don't commit secrets** — `.env` files are gitignored; never put tokens or credentials in this repo
- **Don't push a broken state to `main`** — if you're mid-way through something, stay on a branch

---

*Questions? Reach out to **Andrew Malone** — andrew.malone@backmarket.com or Seller XP design channel on Slack.*
