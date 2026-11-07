import { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { getLocalBlogsMeta } from "@/lib/blogs";
import { Projects } from "@/config/projects";
import { experiences } from "@/config/experience";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  // Main pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/skills`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contributions`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/resume`,
      lastModified: new Date("2026-11-07"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic project detail pages
  const projectRoutes: MetadataRoute.Sitemap = Projects.map((project) => ({
    url: `${baseUrl}/projects/${project.id}`,
    lastModified: new Date(project.endDate),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic experience detail pages
  const experienceRoutes: MetadataRoute.Sitemap = experiences.map(
    (experience) => ({
      url: `${baseUrl}/experience/${experience.id}`,
      lastModified: new Date(),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })
  );

  // Blog post pages — local posts only (external posts live on their platform)
  const blogs = getLocalBlogsMeta();
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...routes, ...projectRoutes, ...experienceRoutes, ...blogRoutes];
}
