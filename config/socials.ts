import { resolveIcon } from "@/lib/resolve-icon";
import { portfolio } from "./content";

export interface SocialInterface {
  name: string;
  username: string;
  icon: any;
  link: string;
}

export const SocialLinks: SocialInterface[] = portfolio.socials.map(
  (social) => ({
    ...social,
    icon: resolveIcon(social.icon),
  })
);
