import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { projects } from "../data/portfolio";
import { strategyPipeline } from "../data/strategy-pipeline";

test("Strategy Navigator merges automation and preserves the supplied workflow", async ({
  page,
  request,
}) => {
  const response = await request.get("/projects/ai-workflow-automation", {
    maxRedirects: 0,
  });
  expect(response.status()).toBe(308);
  expect(response.headers().location).toBe("/projects/strategy-navigator");
  await page.goto("/");
  await expect(page.locator(".project-card")).toHaveCount(5);
  await expect(
    page.getByRole("heading", {
      name: "AI Workflow Automation Platform",
      exact: true,
    }),
  ).toHaveCount(0);
  await expect(page.locator(".project-number")).toHaveText([
    "/01",
    "/02",
    "/03",
    "/04",
    "/05",
  ]);
  await page.goto("/projects/strategy-navigator");
  const nodes = strategyPipeline.flatMap((stage) =>
    stage.kind === "step" ? [stage.node] : stage.branches.flat(),
  );
  await expect(page.locator(".pipeline-node strong")).toHaveText(
    nodes.map((node) => node.title),
  );
  const parallel = page.locator(".pipeline-stage-parallel");
  await expect(
    parallel.locator(".pipeline-branch").first().locator(".pipeline-node"),
  ).toHaveCount(1);
  await expect(
    parallel.locator(".pipeline-branch").last().locator(".pipeline-node"),
  ).toHaveCount(2);
  await expect(
    page.locator(".pipeline-stage-choice .pipeline-node"),
  ).toHaveCount(2);
  const pipeline = page.locator(".strategy-pipeline");
  const toggle = pipeline.getByRole("button", {
    name: "Pause Strategy Navigator pipeline animation",
  });
  await toggle.click();
  await expect(pipeline).not.toHaveClass(/is-running/);
  expect(
    await pipeline
      .locator(".flow-signal")
      .first()
      .evaluate((el) => getComputedStyle(el).animationPlayState),
  ).toBe("paused");
  await pipeline
    .getByRole("button", { name: "Play Strategy Navigator pipeline animation" })
    .click();
  await expect(pipeline).toHaveClass(/is-running/);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(toggle).toBeHidden();
  await expect(pipeline.locator(".flow-signal:visible")).toHaveCount(0);
});

test("every project opens its own complete overview in a new tab", async ({
  page,
  context,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  for (const project of projects) {
    const link = page.getByRole("link", {
      name: `View overview: ${project.name} (opens in a new tab)`,
      exact: true,
    });
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const popupPromise = page.waitForEvent("popup");
    await link.click();
    const overview = await popupPromise;
    const errors: string[] = [];
    overview.on("pageerror", (error) => errors.push(error.message));
    await overview.waitForLoadState("load");
    await expect(overview).toHaveURL(`/projects/${project.slug}`);
    await expect(overview).toHaveTitle(`${project.name} | Hetvi Shah`);
    await expect(overview.getByRole("heading", { level: 1 })).toHaveText(
      project.name,
    );
    for (const paragraph of project.overview)
      await expect(
        overview.getByText(paragraph, { exact: true }),
      ).toBeVisible();
    await expect(overview.locator(".overview-contributions li")).toHaveText(
      project.highlights.map(
        (highlight, i) => `${String(i + 1).padStart(2, "0")}${highlight}`,
      ),
    );
    await expect(overview.locator(".overview-technologies li")).toHaveText(
      project.technologies,
    );
    if (project.visual === "strategy") {
      await expect(overview.locator(".pipeline-node")).toHaveCount(14);
      await expect(
        overview.getByText("Running in parallel", { exact: true }),
      ).toBeVisible();
    } else {
      await expect(overview.locator(".overview-workflow li strong")).toHaveText(
        project.flow,
      );
    }
    const live = overview.getByRole("link", { name: /Visit .* website/ });
    await expect(live).toHaveCount(0);
    await expect(overview.locator('a[href*="ADD_"]')).toHaveCount(0);
    await expect(overview.locator('link[rel="canonical"]')).toHaveCount(0);
    expect(errors).toEqual([]);
    await overview.close();
    await expect(page).toHaveURL("/");
    expect(context.pages()).toHaveLength(1);
  }
});

test("card surfaces open the overview while nested controls stay independent", async ({
  page,
  context,
}) => {
  await page.goto("/");
  const card = page.locator(".project-card").first();
  await card.scrollIntoViewIfNeeded();
  const pause = card.getByRole("button", { name: /Pause flow animation/ });
  await pause.click();
  await expect(
    card.getByRole("button", { name: /Play flow animation/ }),
  ).toBeVisible();
  await card.locator("summary").click();
  await expect(card.locator("details")).toHaveAttribute("open", "");
  expect(context.pages()).toHaveLength(1);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const description = card.locator(".project-description");
  await description.scrollIntoViewIfNeeded();
  const box = (await description.boundingBox())!;
  const opened = page.waitForEvent("popup");
  await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  const popup = await opened;
  await expect(popup).toHaveURL(`/projects/${projects[0].slug}`);
  await popup.close();
  const link = card.locator(".project-overview-link");
  await link.focus();
  const keyboardOpened = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const keyboardPopup = await keyboardOpened;
  await expect(keyboardPopup).toHaveURL(`/projects/${projects[0].slug}`);
  await keyboardPopup.close();
});

test("overviews fit narrow screens and pass accessibility basics", async ({
  page,
}) => {
  test.setTimeout(90000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const project of projects) {
    await page.goto(`/projects/${project.slug}`);
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
        `${project.slug} at ${width}px`,
      ).toBeLessThanOrEqual(1);
    }
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(results.violations, project.slug).toEqual([]);
    const broken = await page
      .locator('a[href^="#"]')
      .evaluateAll((links) =>
        links
          .map((link) => link.getAttribute("href")!)
          .filter((href) => !document.getElementById(href.slice(1))),
      );
    expect(broken).toEqual([]);
    await expect(page.locator(".flow-signal:visible")).toHaveCount(0);
  }
});

test("detail navigation works, unknown projects return 404, and content works without JavaScript", async ({
  page,
  request,
  browser,
}) => {
  await page.goto(`/projects/${projects[0].slug}`);
  await page.locator(".overview-next-project").click();
  await expect(page).toHaveURL(`/projects/${projects[1].slug}`);
  await page.getByRole("link", { name: "All projects", exact: true }).click();
  await expect(page).toHaveURL("/#projects");
  expect((await request.get("/projects/not-a-project")).status()).toBe(404);
  const context = await browser.newContext({ javaScriptEnabled: false });
  const noJs = await context.newPage();
  await noJs.goto(`http://127.0.0.1:3000/projects/${projects[0].slug}`);
  await expect(noJs.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(noJs.locator(".overview-contributions li")).toHaveCount(
    projects[0].highlights.length,
  );
  await context.close();
});
