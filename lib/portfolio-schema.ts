import { z } from "zod";

const metadataSchema = z.object({
  title: z.string(),
  description: z.string(),
});

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  metadata: metadataSchema,
});

const siteSchema = z.object({
  name: z.string(),
  authorName: z.string(),
  username: z.string(),
  role: z.string(),
  tagline: z.string(),
  careerStartDate: z.string(),
  description: z.string(),
  url: z.string(),
  links: z.object({
    twitter: z.string(),
    github: z.string(),
    discord: z.string().optional(),
    templateRepo: z.string().optional(),
  }),
  ogImage: z.string(),
  iconIco: z.string(),
  logoIcon: z.string(),
  keywords: z.array(z.string()),
});

const socialSchema = z.object({
  name: z.string(),
  username: z.string(),
  icon: z.string(),
  link: z.string(),
});

const navigationSchema = z.object({
  mainNav: z.array(
    z.object({
      title: z.string(),
      href: z.string(),
      disabled: z.boolean().optional(),
      enabled: z.boolean().optional(),
    })
  ),
});

const skillSchema = z.object({
  name: z.string(),
  description: z.string(),
  rating: z.number(),
  icon: z.string(),
});

const projectSchema = z.object({
  id: z.string(),
  companyName: z.string(),
  type: z.string(),
  category: z.array(z.string()),
  shortDescription: z.string(),
  websiteLink: z.string().optional(),
  githubLink: z.string().optional(),
  techStack: z.array(z.string()),
  startDate: z.string(),
  endDate: z.string(),
  companyLogoImg: z.string(),
  pagesInfoArr: z.array(
    z.object({
      title: z.string(),
      imgArr: z.array(z.string()),
      description: z.string().optional(),
    })
  ),
  descriptionDetails: z.object({
    paragraphs: z.array(z.string()),
    bullets: z.array(z.string()),
  }),
  featured: z.boolean().optional(),
});

const experienceSchema = z.object({
  id: z.string(),
  position: z.string(),
  company: z.string(),
  location: z.string(),
  companyUrl: z.string().optional(),
  logo: z.string().optional(),
  startDate: z.string(),
  endDate: z.string(),
  description: z.array(z.string()),
  achievements: z.array(z.string()),
  skills: z.array(z.string()),
});

const contributionSchema = z.object({
  repo: z.string(),
  contibutionDescription: z.string(),
  repoOwner: z.string(),
  link: z.string(),
});

const blogSchema = z.object({
  priority: z.array(z.string()).default(["hashnode", "devto", "medium", "codedamn", "local"]),
  sources: z.object({
    devto: z.object({ username: z.string() }).optional(),
    hashnode: z.object({ username: z.string() }).optional(),
    medium: z.object({ username: z.string() }).optional(),
    codedamn: z.object({ host: z.string() }).optional(),
  }),
  featured: z.array(z.string()).default([]),
  ignoreTitles: z.array(z.string()).default([]),
});

export const portfolioSchema = z.object({
  site: siteSchema,
  socials: z.array(socialSchema),
  navigation: navigationSchema,
  pages: z.record(z.string(), pageSchema),
  skills: z.array(skillSchema),
  projects: z.array(projectSchema),
  experience: z.array(experienceSchema),
  contributions: z.array(contributionSchema),
  blog: blogSchema,
});

export type PortfolioContent = z.infer<typeof portfolioSchema>;
export type PortfolioPage = z.infer<typeof pageSchema>;
export type PortfolioBlog = z.infer<typeof blogSchema>;
