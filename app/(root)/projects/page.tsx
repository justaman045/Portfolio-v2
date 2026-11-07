import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import ProjectCard from "@/components/projects/project-card";
import { ResponsiveTabs } from "@/components/ui/responsive-tabs";
import { pagesConfig } from "@/config/pages";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import Script from "next/script";

export const metadata: Metadata = {
  title: pagesConfig.projects.metadata.title,
  description: pagesConfig.projects.metadata.description,
};

const renderContent = (tabVal: string) => {
  let projectArr = Projects;
  if (tabVal === "personal") {
    projectArr = projectArr.filter((val) => val.type === "Personal");
  } else if (tabVal === "professional") {
    projectArr = projectArr.filter((val) => val.type === "Professional");
  }

  return (
    <div className="mx-auto my-4 grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3 static items-stretch">
      {projectArr.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </div>
  );
};

export default function ProjectsPage() {
  // Product/SoftwareApplication structured data for each project
  const productSchemas = Projects.map((project) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.companyName,
    applicationCategory: project.category.join(", "),
    description: project.shortDescription,
    url: project.websiteLink || project.githubLink,
    creator: {
      "@type": "Person",
      name: siteConfig.authorName,
      url: siteConfig.url,
    },
    dateCreated: project.startDate.toISOString(),
    ...(project.endDate
      ? { dateModified: project.endDate.toISOString() }
      : {}),
    ...(project.githubLink ? { codeRepository: project.githubLink } : {}),
  }));

  // BreadcrumbList for projects page
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${siteConfig.url}/projects`,
      },
    ],
  };

  const tabItems = [
    {
      value: "all",
      label: "All",
      content: renderContent("all"),
    },
    {
      value: "personal",
      label: "Personal",
      content: renderContent("personal"),
    },
    {
      value: "professional",
      label: "Professional",
      content: renderContent("professional"),
    },
  ];

  return (
    <PageContainer
      title={pagesConfig.projects.title}
      description={pagesConfig.projects.description}
    >
      <Script
        id="schema-products"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchemas) }}
      />
      <Script
        id="schema-breadcrumb-projects"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ResponsiveTabs items={tabItems} defaultValue="all" />
    </PageContainer>
  );
}
