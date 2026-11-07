import { describe, it, expect } from "vitest";
import { portfolioSchema } from "@/lib/portfolio-schema";
import raw from "@/content/portfolio.json";

describe("Content validation", () => {
  it("portfolio.json validates against the Zod schema", () => {
    const result = portfolioSchema.safeParse(raw);
    expect(result.success).toBe(true);
    if (!result.success) {
      console.error(
        result.error.issues.map(
          (i) => `${i.path.join(".")}: ${i.message}`
        )
      );
    }
  });

  it("has required top-level sections", () => {
    const result = portfolioSchema.safeParse(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.site).toBeDefined();
      expect(result.data.socials).toBeDefined();
      expect(result.data.navigation).toBeDefined();
      expect(result.data.pages).toBeDefined();
      expect(result.data.skills).toBeDefined();
      expect(result.data.projects).toBeDefined();
      expect(result.data.experience).toBeDefined();
      expect(result.data.contributions).toBeDefined();
      expect(result.data.blog).toBeDefined();
    }
  });

  it("has at least one featured project", () => {
    const result = portfolioSchema.safeParse(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      const featured = result.data.projects.filter((p) => p.featured);
      expect(featured.length).toBeGreaterThan(0);
    }
  });

  it("has valid icon keys referenced in skills", () => {
    const result = portfolioSchema.safeParse(raw);
    expect(result.success).toBe(true);
    if (result.success) {
      for (const skill of result.data.skills) {
        expect(typeof skill.icon).toBe("string");
        expect(skill.icon.length).toBeGreaterThan(0);
      }
    }
  });
});
