import { Metadata } from "next";

import { NewsletterForm } from "@/components/common/newsletter-form";
import PageContainer from "@/components/common/page-container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Newsletter — Subscribe | ${siteConfig.name}`,
  description:
    "Subscribe to my newsletter for updates on test automation, QA engineering, and software development.",
  alternates: {
    canonical: `${siteConfig.url}/newsletter`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function NewsletterPage() {
  return (
    <PageContainer
      title="Newsletter"
      description="Subscribe to my newsletter for updates on test automation, QA engineering, and software development."
    >
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl leading-tight text-foreground mb-4">
            Newsletter
          </h1>
          <p className="text-lg text-muted-foreground">
            Get updates on test automation, QA engineering, AI-augmented
            testing, and software development.
          </p>
        </div>
        <NewsletterForm />
      </div>
    </PageContainer>
  );
}
