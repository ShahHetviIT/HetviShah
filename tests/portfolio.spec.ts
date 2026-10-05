import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../data/portfolio";
const aiCount = projects.filter((project) => project.kind === "ai").length;

test("renders the portfolio with valid internal links and safe placeholders", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page).toHaveTitle(
    "Hetvi Shah | AI Engineer & Software Engineer",
  );
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator(".project-card")).toHaveCount(projects.length);
  expect(await page.locator('a[href*="ADD_"]').count()).toBe(0);
  expect(await page.locator('a[href="/resume.pdf"]').count()).toBe(2);
  expect(await page.locator('a[href^="mailto:"]').count()).toBe(0);
  const missingTargets = await page
    .locator('a[href^="#"]')
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href")!)
        .filter(
          (href) => href.length > 1 && !document.getElementById(href.slice(1)),
        ),
    );
  expect(missingTargets).toEqual([]);
  const structured = await page
    .locator('script[type="application/ld+json"]')
    .textContent();
  expect(JSON.parse(structured!).name).toBe("Hetvi Shah");
  await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
  expect(errors).toEqual([]);
});

test("project filtering and contribution disclosures work", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Software 01" }).click();
  await expect(page.locator(".project-card")).toHaveCount(1);
  await expect(page.locator(".project-card h3")).toHaveText(
    "Web Data Intelligence & Lead Enrichment Platform",
  );
  await page.getByRole("button", { name: /AI systems/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(aiCount);
  const first = page.locator(".project-card").first();
  await first.locator("summary").click();
  await expect(first.locator("details")).toHaveAttribute("open", "");
  await expect(
    first.getByText(/Built agentic workflows using LangGraph/),
  ).toBeVisible();
  await first.locator("summary").press("Enter");
  await expect(first.locator("details")).not.toHaveAttribute("open", "");
  await page.getByRole("button", { name: /All work/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(projects.length);
});

test("responsive layouts do not overflow horizontally", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [320, 375, 390, 768, 1024, 1440, 1920]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(100);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth,
    );
    expect(overflow, `overflow at ${width}px`).toBeLessThanOrEqual(1);
  }
});

test("mobile navigation supports Escape and moves focus to the destination", async ({
  page,
}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Open navigation" });
  await toggle.click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(toggle).toBeFocused();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await toggle.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: /Projects/ })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#projects")).toBeFocused();
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe(
    "hidden",
  );
});

test("marquee pauses and reduced motion disables continuous animation", async ({
  page,
}) => {
  await page.goto("/");
  const pause = page.getByRole("button", { name: "Pause technology marquee" });
  await pause.click();
  await expect(
    page.getByRole("button", { name: "Play technology marquee" }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator(".marquee-track")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const selector of [
    ".marquee-track",
    ".signal-lines",
    ".input-node",
    ".focus-grid",
  ]) {
    expect(
      await page
        .locator(selector)
        .evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("none");
  }
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
});

test("page has no automatically detectable WCAG AA violations", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 35));
    }
  });
  await page.waitForTimeout(800);
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();
  expect(
    results.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    })),
  ).toEqual([]);
});

test("metadata assets and crawler routes respond successfully", async ({
  request,
}) => {
  for (const route of [
    "/icon.svg",
    "/apple-icon",
    "/opengraph-image",
    "/twitter-image",
    "/robots.txt",
    "/sitemap.xml",
    "/resume.pdf",
  ]) {
    const response = await request.get(route);
    expect(response.ok(), route).toBeTruthy();
  }
  expect(await (await request.get("/robots.txt")).text()).toContain(
    "Disallow: /",
  );
});

test("reduced-motion rendering has no hydration errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: /AI systems/ }).click();
  await expect(page.locator(".project-card")).toHaveCount(aiCount);
  expect(errors).toEqual([]);
});

test("core content remains readable without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000");
  await expect(page.locator("h1")).toBeVisible();
  await expect
    .poll(() =>
      page
        .locator("h1")
        .evaluate((el) => getComputedStyle(el.parentElement!).opacity),
    )
    .toBe("1");
  await expect(page.locator(".project-card")).toHaveCount(projects.length);
  await context.close();
});

test("the supplied resume is downloadable as a real PDF", async ({
  request,
}) => {
  const response = await request.get("/resume.pdf");
  expect(response.ok()).toBeTruthy();
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
});

test("hero visualization can be paused and resumed", async ({ page }) => {
  await page.goto("/");
  const pause = page.getByRole("button", {
    name: "Pause flow animation",
    exact: true,
  });
  await pause.click();
  await expect(
    page.getByRole("button", { name: "Play flow animation", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  expect(
    await page
      .locator(".signal-lines")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  await page
    .getByRole("button", { name: "Play flow animation", exact: true })
    .click();
  await expect(pause).toHaveAttribute("aria-pressed", "false");
  expect(
    await page
      .locator(".signal-lines")
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("running");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(pause).toBeHidden();
  expect(
    await page
      .locator(".graph-orbit-satellite")
      .evaluate((el) => getComputedStyle(el).display),
  ).toBe("none");
});

test("new resume projects have readable details and reduced-motion-safe visuals", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const selector of [".project-voice", ".project-rag"]) {
    const project = page.locator(selector);
    await project.locator("summary").click();
    await expect(project.locator("details")).toHaveAttribute("open", "");
    await expect(project.locator(".project-detail-content")).toBeVisible();
  }
  expect(
    await page
      .locator(".voice-wave i")
      .first()
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  expect(
    await page
      .locator(".retrieval-scan")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
});

test("every project has directional animated arrows with pause controls", async ({
  page,
}) => {
  await page.goto("/");
  for (const project of projects) {
    const frame = page.locator(`.visual-${project.visual}`);
    await frame.scrollIntoViewIfNeeded();
    await expect(frame).toHaveClass(/is-running/);
    const tracks = frame.locator(".flow-track");
    expect(await tracks.count()).toBeGreaterThan(0);
    expect(await tracks.first().getAttribute("marker-end")).toContain(
      "url(#arrow-",
    );
    const signal = frame.locator(".flow-signal").first();
    expect(
      await signal.evaluate((el) => getComputedStyle(el).animationName),
    ).toBe("directional-flow");
    await frame
      .getByRole("button", {
        name: `Pause flow animation for ${project.name}`,
        exact: true,
      })
      .click();
    await expect(frame).not.toHaveClass(/is-running/);
    expect(
      await signal.evaluate((el) => getComputedStyle(el).animationPlayState),
    ).toBe("paused");
    await frame
      .getByRole("button", {
        name: `Play flow animation for ${project.name}`,
        exact: true,
      })
      .click();
    await expect(frame).toHaveClass(/is-running/);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(await page.locator(".diagram-toggle:visible").count()).toBe(0);
  expect(await page.locator(".flow-signal:visible").count()).toBe(0);
});

test("branch arrows stay aligned to their nodes across viewport sizes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const selector of [".strategy-map", ".rag-map"]) {
      const result = await page.locator(selector).evaluate((map) => {
        const sources = [
          ...map.querySelectorAll(".strategy-source, .rag-document"),
        ];
        const tracks = [...map.querySelectorAll<SVGPathElement>(".flow-track")];
        const engine = map
          .querySelector(".diagram-core, .retrieval-engine")!
          .getBoundingClientRect();
        return sources.map((source, index) => {
          const bounds = source.getBoundingClientRect();
          const path = tracks[index];
          const matrix = path.getScreenCTM()!;
          const start = path.getPointAtLength(0).matrixTransform(matrix);
          const end = path
            .getPointAtLength(path.getTotalLength())
            .matrixTransform(matrix);
          return {
            dx: Math.abs(start.x - bounds.left - bounds.width / 2),
            dy: Math.abs(start.y - bounds.bottom),
            gap: engine.top - end.y,
            entersEngine: end.x > engine.left && end.x < engine.right,
          };
        });
      });
      for (const edge of result) {
        expect(edge.dx, `${selector} at ${width}px`).toBeLessThan(2);
        expect(edge.dy, `${selector} at ${width}px`).toBeLessThan(2);
        expect(edge.gap).toBeGreaterThan(0);
        expect(edge.gap).toBeLessThan(12);
        expect(edge.entersEngine).toBe(true);
      }
    }
  }
});

test("all major surfaces use the requested light theme", async ({ page }) => {
  await page.goto("/");
  for (const selector of [
    "body",
    ".agent-visual",
    ".project-strategy",
    ".visual-strategy",
    ".capabilities-section",
    ".focus-section",
    ".contact-section",
    ".footer",
  ]) {
    const colors = await page.locator(selector).evaluate((el) => {
      const style = getComputedStyle(el);
      return [
        ...`${style.backgroundColor} ${style.backgroundImage}`.matchAll(
          /rgba?\(([^)]+)\)/g,
        ),
      ]
        .map((match) => match[1].split(/[,\s]+/).map(Number))
        .filter((color) => color.length < 4 || color[3] > 0.1);
    });
    expect(colors.length, selector).toBeGreaterThan(0);
    for (const color of colors)
      expect((color[0] + color[1] + color[2]) / 3, selector).toBeGreaterThan(
        170,
      );
  }
});
