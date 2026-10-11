import { Icons } from "@/components/common/icons";

export function resolveIcon(key: string): any {
  const icon = (Icons as unknown as Record<string, any>)[key];
  if (!icon) {
    throw new Error(
      `Unknown icon key "${key}" referenced in content/portfolio.json. ` +
        `Add it to components/common/icons.tsx.`
    );
  }
  return icon;
}
