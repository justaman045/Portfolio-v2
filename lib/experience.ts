const TOKEN = "{yearsOfExperience}";

/**
 * Whole years of experience from a start date, rounded to the nearest year.
 * Computed at content-load time so values never go stale.
 */
export function getYearsOfExperience(
  startISO: string,
  now: Date = new Date()
): number {
  const start = new Date(startISO);
  if (Number.isNaN(start.getTime())) return 0;
  const years =
    (now.getTime() - start.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
  return Math.max(0, Math.round(years));
}

/**
 * Recursively replaces the `{yearsOfExperience}` token in every string of the
 * content tree, so taglines/page copy stay in sync with `careerStartDate`.
 */
export function interpolateExperience<T>(value: T, years: number): T {
  if (typeof value === "string") {
    return value.split(TOKEN).join(String(years)) as unknown as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => interpolateExperience(item, years)) as unknown as T;
  }
  if (value && typeof value === "object") {
    const result: Record<string, unknown> = {};
    for (const [key, nested] of Object.entries(value)) {
      result[key] = interpolateExperience(nested, years);
    }
    return result as T;
  }
  return value;
}
