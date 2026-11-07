import { z } from "zod";

const envSchema = z.object({
  // Required at build time — app throws if missing
  NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID: z.string().min(1, {
    message: "NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID is required. See .env.copy",
  }),
  // Required for contact form
  CONTACT_SUBMIT_URL: z.string().url().optional(),
  // Optional — empty string is treated as unset
  NEXT_PUBLIC_GOOGLE_VERIFICATION: z
    .string()
    .min(1)
    .or(z.literal(""))
    .optional(),
  NEXT_PUBLIC_DISCORD_LINK: z.string().url().or(z.literal("")).optional(),
  NEXT_PUBLIC_RESUME_LINK: z.string().url().or(z.literal("")).optional(),
});

type Env = z.infer<typeof envSchema>;

let validatedEnv: Env | null = null;

/**
 * Validates all required environment variables at load time.
 * Call once at module initialization in layout.tsx and API routes.
 * Throws a clear error listing all missing/invalid variables.
 */
export function validateEnv(): Env {
  if (validatedEnv) return validatedEnv;

  const rawEnv = {
    NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID,
    CONTACT_SUBMIT_URL: process.env.CONTACT_SUBMIT_URL,
    NEXT_PUBLIC_GOOGLE_VERIFICATION:
      process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    NEXT_PUBLIC_DISCORD_LINK: process.env.NEXT_PUBLIC_DISCORD_LINK,
    NEXT_PUBLIC_RESUME_LINK: process.env.NEXT_PUBLIC_RESUME_LINK,
  };

  const result = envSchema.safeParse(rawEnv);

  if (!result.success) {
    const missing = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid or missing environment variables:\n\n${missing}\n\nSee .env.copy for required values.`
    );
  }

  validatedEnv = result.data;
  return validatedEnv;
}

/**
 * Returns the validated env, throwing if not yet validated.
 * Use this in components that need env values after validation has occurred.
 */
export function getEnv(): Env {
  if (!validatedEnv) {
    throw new Error(
      "Environment variables have not been validated. Call validateEnv() first."
    );
  }
  return validatedEnv;
}
