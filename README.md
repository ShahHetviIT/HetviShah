# Hetvi Shah — AI Engineer Portfolio

A complete, responsive, portfolio with a single-page home and dedicated project overviews, built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion, and Lucide. Content is based on the supplied portfolio brief and Hetvi’s updated resume. Five projects cover strategy orchestration and automation, social publishing, multilingual voice agents, RAG, and backend engineering. No metrics or social accounts have been invented.

## Run locally

Requires Node.js 20.9+ and npm.

```bash
npm install
npm run dev
```

Open **http://localhost:3000**. No domain, backend, database, API keys, or external account is required.

For an exact lockfile installation, use `npm ci`.

## Production and checks

```bash
npm run lint
npm run build
npm run typecheck
npm run start
```

The production server also runs on http://localhost:3000. The site is statically prerendered during the build.

Browser checks run against the production build:

```bash
npx playwright install chromium
npm run test:e2e
```

To use an already installed browser instead, set `PLAYWRIGHT_CHROME_PATH=/path/to/chrome` when running the tests.

The Playwright suite checks desktop/mobile rendering, seven viewport widths, horizontal overflow, local links, safe social placeholders, project filters, disclosures, mobile keyboard navigation, reduced motion, pausable hero and project graphs, connector alignment on mobile/tablet/desktop, light surfaces, the actual resume PDF, new project details, WCAG AA basics with axe, and SEO asset routes. Contact assertions assume the email and social links remain unconfigured.

## Edit content

Edit `data/portfolio.ts` for the name, bio, location, social links, email, resume path, projects, capabilities, experience, grouped skills, process, and current focus.

- Set `portfolio.socials.github` and `portfolio.socials.linkedin` to real HTTPS URLs. Values beginning with `ADD_` and invalid URLs are never rendered as links.
- Set `portfolio.email` to a real email address. Until then, the contact area shows “Contact details coming soon” without a broken mail link.
- Your supplied resume is at **`public/resume.pdf`**. Both resume buttons open it in a new tab, where visitors can read it or use their PDF viewer's download option. Replace that file when your resume changes, then rebuild. If it is removed, the controls automatically show a “Soon” state instead of a broken link.
- Every project card opens its local `/projects/[slug]` overview in a new tab. Edit `projects[].slug` and `projects[].overview` alongside the existing contributions, technologies, and workflow to maintain each detail page. All five routes are statically generated.
- Live website links have been removed from all project overviews. Diagram pause controls and the home-page “Inside the build” disclosures remain independent of the card link.
- Edit the skill groups to add or remove skills. No proficiency percentages are used.

Structural section copy lives in the corresponding components. All professional profile information and project content lives in the central data module.

## Domain and SEO

The production domain is **https://hetvi-shah-portfolio.vercel.app**.

The production robots file explicitly allows Googlebot, Google-Extended (Gemini), OpenAI's OAI-SearchBot/GPTBot/ChatGPT-User, ClaudeBot/Claude-SearchBot/Claude-User, and PerplexityBot/Perplexity-User. The `*` rule covers other compliant crawlers. This permits search and retrieval as well as model-training uses for the relevant bots; it does not guarantee indexing or inclusion in AI answers. All listed agents receive `Disallow: /` when the site URL is disabled, including Vercel previews. Robots directives are advisory, and some user-initiated fetchers may not apply them.

Production builds use this domain by default for canonical URLs, social metadata, structured data, and the sitemap. `/sitemap.xml` includes the homepage and all five project overviews; `/robots.txt` allows crawling and points to the sitemap. Vercel previews remain excluded from indexing, with crawling disallowed and an empty sitemap. Local development behaves the same unless a valid URL override is configured.

For a future custom domain, set `NEXT_PUBLIC_SITE_URL` in Vercel's Production environment:

```dotenv
NEXT_PUBLIC_SITE_URL=https://your-real-domain
```

Redeploy after changing it. Editing `.env.example` alone does not configure Vercel. After deployment, check `/robots.txt` and `/sitemap.xml`, then submit `sitemap.xml` in Google Search Console. The application includes Person JSON-LD, Open Graph/Twitter image generation, SVG favicon, and Apple touch icon.

## Deploy to Vercel later

1. Push this project to a Git repository and import it into Vercel.
2. Choose the **Next.js** preset and a supported Node.js version (20.9 or newer).
3. Keep the default install/build settings: `npm install` and `npm run build`.
4. Add real contact information and `public/resume.pdf` if available.
5. Optionally set `NEXT_PUBLIC_SITE_URL` when using a custom domain. The confirmed Vercel domain is already the production default.
6. Deploy and verify `/robots.txt` and `/sitemap.xml` on the production domain.

No database or server setup is needed. Nothing has been deployed by this task.

## Project structure

```text
app/                         Home, layout, global tokens/styles, metadata assets
  projects/[slug]/           Static project overviews and responsive detail styling
components/
  sections/                  Hero, About, Projects, Capabilities, Experience,
                             Skills, Process, Current Focus, Contact
  ui/                        Shared links, headings, Motion wrappers
  agent-graph.tsx             Custom SVG/CSS orchestration visualization
  project-architecture.tsx   Five custom project diagrams
  project-card.tsx            Expandable contribution details
  navbar.tsx                 Responsive navigation and keyboard handling
  tech-marquee.tsx            Pausable technology strip
  footer.tsx
data/portfolio.ts            Typed, centralized content and safe link helpers
lib/site.ts                  Optional production URL and SEO text
public/                      Supplied resume.pdf
tests/                       Browser and accessibility checks
```

## Design and accessibility

An entirely light theme with off-white editorial sections, soft lavender and sky-blue accents, coral Voice AI and mint RAG diagrams, and pale technical/contact sections. All diagrams are HTML/SVG/CSS; no stock images or image API calls. Fonts are local variable WOFF2 files bundled using `next/font/local`, so builds do not fetch Google Fonts.

Motion uses transform/opacity and respects the system reduced-motion preference. CSS animations stop in reduced-motion mode; the technology strip becomes manually scrollable. Pause controls are available for the technology marquee, hero visualization, and every project diagram. Directional SVG arrowheads and traveling signals show flow through every architecture. Project signals, voice waveforms, and retrieval scans animate automatically in view and pause offscreen. Reduced motion preserves static arrows while hiding moving signals and disabling parallax. Native cursors remain unchanged. Interactive glows respond only to mouse pointers. Disclosures work with keyboard and touch.

Includes semantic landmarks, one H1, a skip link, visible keyboard focus, mobile Escape handling, section focus after navigation, descriptive external links, and decorative diagram hiding. Automated accessibility checks complement manual browser review; they do not certify accessibility in every assistive technology.

## Resume update

The supplied PDF added Conversational AI Voice Agents and WishAI Knowledge Assistant, enriched CYDRA with specialized content agents, and expanded workflow details with LiteLLM routing, checkpoint recovery, Redis, MongoDB, and S3. The original Strategy Navigator and backend/data engineering work remain. Employment dates and role titles were not changed. Social links and email remain unconfigured because the resume does not provide them.

## Verification — October 1, 2026

- Production build, ESLint, and standalone TypeScript checks pass.
- Production browser suite: **29 passed**, one mobile-only navigation test intentionally skipped on desktop.
- No horizontal overflow at 320, 375, 390, 768, 1024, 1440, and 1920 pixels.
- Desktop and mobile automated WCAG A/AA checks pass with no detected violations.
- Verified six-project filtering, contribution disclosures, internal anchors, keyboard navigation, resume download, all metadata routes, reduced motion, and core content without JavaScript.
- Verified each graph pauses/resumes, all project diagrams have animated directional arrows, and effects respect reduced motion. Strategy and RAG connector geometry is checked at 320, 768, and 1440 pixels.
- No runtime/hydration errors detected in tested states.
- The downloadable PDF is byte-for-byte identical to the supplied resume (SHA-256 verified).
- Domain, social URLs, and email remain unconfigured; no placeholder social links are rendered.

SEO indexing stays disabled until a production domain is configured.

## Project overview update — October 5, 2026

Each card now opens a project-specific overview in a new tab. Each page includes product context, Hetvi’s contributions, the animated architecture, an ordered system flow, the configured technology stack, with no external live website links. Navigation returns to the portfolio or continues to the next project. Content comes from `data/portfolio.ts`; no external content is fetched. Each project has its own metadata and is included in the sitemap once a production domain is configured. Localhost remains the current setup.

Validation for this update: production build, ESLint, and TypeScript pass. The production browser suite reports **37 passed** and one intentionally skipped desktop-only instance of the mobile navigation check. New checks cover all six new-tab destinations, full overview content, card background and keyboard activation, independent diagram controls, next/back navigation, unknown-project 404s, rendering without JavaScript, reduced motion, accessibility, and narrow layouts. Diagram containers were also checked for clipping at 320px and 1440px.

## Strategy Navigator consolidation

The former AI Workflow Automation Platform entry is part of Strategy Navigator. Its contribution and technology details are merged into that project; the portfolio now has five projects numbered 01–05. The old `/projects/ai-workflow-automation` URL redirects to `/projects/strategy-navigator`.

`data/strategy-pipeline.ts` transcribes the supplied workflow image into typed stages. The detail page renders an accessible light-themed HTML/SVG diagram with parallel rapid-insight and form/foresight paths, idea consolidation, parent/child voting and middleware, automatic capstone execution, alternative existing/custom archetypes, and report rendering. Pause controls and reduced motion apply to the full pipeline. Professional contribution claims remain separate from this product workflow.

Consolidation validation: production build, ESLint, and TypeScript pass. Browser suite: **39 passed**, one intentionally skipped mobile-only test on desktop. Verified all five new-tab overviews, removal of live links, the old automation URL redirect, supplied pipeline node order and branch structure, pause/resume, reduced motion, responsive layouts, and accessibility basics.
