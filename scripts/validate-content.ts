import { portfolioSchema } from "@/lib/portfolio-schema";
import raw from "@/content/portfolio.json";

const parsed = portfolioSchema.safeParse(raw);

if (!parsed.success) {
  console.error(
    "Invalid content/portfolio.json. Fix the following before building:\n\n" +
      parsed.error.issues
        .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
        .join("\n")
  );
  process.exit(1);
}

console.log("content/portfolio.json is valid.");
