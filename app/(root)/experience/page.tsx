import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import Timeline from "@/components/experience/timeline";
import { experiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import Script from "next/script";

export const metadata: Metadata = {
  title: `${pagesConfig.experience.metadata.title} | Professional Experience Timeline`,
  description: `${pagesConfig.experience.metadata.description} Explore my professional journey and career milestones in software development.`,
  keywords: [
    "experience timeline",
    "professional experience",
    "software developer experience",
    "developer portfolio",
    "work experience",
  ],
  alternates: {
    canonical: `${siteConfig.url}/experience`,
  },
};

export default function ExperiencePage() {
  // JobPosting structured data for each experience entry
  const jobPostings = experiences.map((exp) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: exp.position,
    hiringOrganization: {
      "@type": "Organization",
      name: exp.company,
      url: exp.companyUrl,
      sameAs: exp.companyUrl ? [exp.companyUrl] : [],
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: exp.location,
      },
    },
    employmentType: "FULL_TIME",
    datePosted: exp.startDate.toISOString(),
    ...(exp.endDate === "Present"
      ? {}
      : { validThrough: exp.endDate.toISOString() }),
    description: exp.description.join(" "),
  }));

  return (
    <PageContainer
      title={pagesConfig.experience.title}
      description={pagesConfig.experience.description}
    >
      <Script
        id="schema-job-postings"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPostings) }}
      />
      <Timeline experiences={experiences} />
    </PageContainer>
  );
}
