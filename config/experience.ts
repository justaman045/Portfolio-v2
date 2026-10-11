import { portfolio } from "./content";

export interface ExperienceInterface {
  id: string;
  position: string;
  company: string;
  location: string;
  startDate: Date;
  endDate: Date | "Present";
  description: string[];
  achievements: string[];
  skills: string[];
  companyUrl?: string;
  logo?: string;
}

export const experiences: ExperienceInterface[] = portfolio.experience.map(
  (experience) => ({
    ...experience,
    startDate: new Date(experience.startDate),
    endDate:
      experience.endDate === "Present"
        ? "Present"
        : new Date(experience.endDate),
  })
);
