import raw from "@/content/portfolio.json";
import { getYearsOfExperience, interpolateExperience } from "@/lib/experience";
import { portfolioSchema, type PortfolioContent } from "@/lib/portfolio-schema";

const parsed = portfolioSchema.safeParse(raw);

if (!parsed.success) {
  throw new Error(
    "Invalid content/portfolio.json. Fix the following before building:\n\n" +
      parsed.error.issues
        .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n")
  );
}

export const yearsOfExperience = getYearsOfExperience(
  parsed.data.site.careerStartDate
);

export const portfolio: PortfolioContent = interpolateExperience(
  parsed.data,
  yearsOfExperience
);
