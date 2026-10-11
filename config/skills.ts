import { resolveIcon } from "@/lib/resolve-icon";
import { portfolio } from "./content";

export interface skillsInterface {
  name: string;
  description: string;
  rating: number;
  icon: any;
}

export const skillsUnsorted: skillsInterface[] = portfolio.skills.map(
  (skill) => ({
    ...skill,
    icon: resolveIcon(skill.icon),
  })
);

export const skills = skillsUnsorted
  .slice()
  .sort((a, b) => b.rating - a.rating);

export const featuredSkills = skills.slice(0, 6);
