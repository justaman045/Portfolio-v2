import { ValidCategory, ValidExpType } from "./constants";
import { portfolio } from "./content";

interface PagesInfoInterface {
  title: string;
  imgArr: string[];
  description?: string;
}

interface DescriptionDetailsInterface {
  paragraphs: string[];
  bullets: string[];
}

export interface ProjectInterface {
  id: string;
  type: ValidExpType;
  companyName: string;
  category: ValidCategory[];
  shortDescription: string;
  websiteLink?: string;
  githubLink?: string;
  techStack: string[];
  startDate: Date;
  endDate: Date;
  companyLogoImg: any;
  descriptionDetails: DescriptionDetailsInterface;
  pagesInfoArr: PagesInfoInterface[];
  featured?: boolean;
}

export const Projects: ProjectInterface[] = portfolio.projects.map((project) => ({
  ...project,
  type: project.type as ValidExpType,
  category: project.category as ValidCategory[],
  startDate: new Date(project.startDate),
  endDate:
    project.endDate === "Present" ? new Date() : new Date(project.endDate),
}));

const featured = Projects.filter((project) => project.featured);
export const featuredProjects =
  featured.length > 0 ? featured.slice(0, 3) : Projects.slice(0, 3);
