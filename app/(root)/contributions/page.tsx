import { Metadata } from "next";

import Script from "next/script";

import PageContainer from "@/components/common/page-container";
import ContributionCard from "@/components/contributions/contribution-card";
import { contributionsUnsorted } from "@/config/contributions";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: pagesConfig.contributions.metadata.title,
  description: pagesConfig.contributions.metadata.description,
};

export default function ContributonsPage() {
  // BreadcrumbList for contributions page
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
        name: "Contributions",
        item: `${siteConfig.url}/contributions`,
      },
    ],
  };

  return (
    <PageContainer
      title={pagesConfig.contributions.title}
      description={pagesConfig.contributions.description}
    >
      <Script
        id="schema-breadcrumb-contributions"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContributionCard
        contributions={contributionsUnsorted}
      />
    </PageContainer>
  );
}
