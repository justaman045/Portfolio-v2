import { Metadata } from "next";

import Script from "next/script";

import PageContainer from "@/components/common/page-container";
import SkillsCard from "@/components/skills/skills-card";
import { pagesConfig } from "@/config/pages";
import { skills } from "@/config/skills";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pagesConfig.skills.metadata.title,
  description: pagesConfig.skills.metadata.description,
};

export default function SkillsPage() {
  // BreadcrumbList for skills page
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
        name: "Skills",
        item: `${siteConfig.url}/skills`,
      },
    ],
  };

  return (
    <PageContainer
      title={pagesConfig.skills.title}
      description={pagesConfig.skills.description}
    >
      <Script
        id="schema-breadcrumb-skills"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SkillsCard skills={skills} />
    </PageContainer>
  );
}
