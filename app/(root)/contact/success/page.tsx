import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import { siteConfig } from "@/config/site";
import Script from "next/script";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Message Sent | " + siteConfig.name,
  description: "Thank you for your message. I'll get back to you shortly.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ContactSuccessPage() {
  return (
    <PageContainer
      title="Message Sent"
      description="Thank you for contacting me. I'll get back to you shortly."
    >
      <Script
        id="schema-contact-success"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Message Sent",
            description:
              "Thank you for your message. I'll get back to you shortly.",
            url: `${siteConfig.url}/contact/success`,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />
      <div className="max-w-md mx-auto text-center py-12">
        <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
          Message Sent!
        </h1>
        <p className="text-muted-foreground mb-8">
          Thank you for reaching out. I&apos;ve received your message and will get back to you shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Back to Home
          </Link>
          <Link
            href="/projects"
            className="px-6 py-3 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors font-medium"
          >
            View Projects
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
