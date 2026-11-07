import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import { siteConfig } from "@/config/site";
import Script from "next/script";
import { resolveIcon } from "@/lib/resolve-icon";
import React from "react";

export const metadata: Metadata = {
  title: `Services — Test Automation & QA Engineering | ${siteConfig.name}`,
  description: "AI-enabled test automation, QA engineering, and software development services. Hire a Senior SDET for your next project.",
  alternates: {
    canonical: `${siteConfig.url}/services`,
  },
};

const services = [
  {
    title: "Test Automation Engineering",
    description:
      "End-to-end test automation using Selenium, Appium, Playwright, Cypress, REST Assured, and TestNG. From framework design to CI/CD integration.",
    icon: "settings",
    features: [
      "Web, mobile, and desktop automation",
      "API testing and validation",
      "Framework architecture (POM, BDD, Keyword-driven)",
      "CI/CD pipeline integration",
    ],
  },
  {
    title: "AI-Augmented QA",
    description:
      "Leveraging LLMs and AI to generate, heal, and prioritize automated tests. Reduce maintenance overhead and increase test coverage.",
    icon: "aurora",
    features: [
      "AI-generated test cases",
      "Self-healing automation",
      "Test prioritization",
      "Smart defect analysis",
    ],
  },
  {
    title: "Quality Engineering Consulting",
    description:
      "STLC ownership, test strategy, defect management, and quality process improvement for enterprise and startup environments.",
    icon: "work",
    features: [
      "Test strategy & planning",
      "Defect lifecycle management",
      "Performance & load testing",
      "Quality metrics & reporting",
    ],
  },
  {
    title: "Software Development (Nexus)",
    description:
      "Custom software products built and sold through Nexus — a software company that designs, engineers, and ships quality products entirely in-house.",
    icon: "gitOrgBuilding",
    features: [
      "Licensed software products",
      "Instant license delivery",
      "Firebase-backed storefront",
      "Razorpay payments",
    ],
  },
];

export default function ServicesPage() {
  // FAQPage structured data for services page
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What services do you offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Test automation engineering, AI-augmented QA, quality engineering consulting, and custom software development through Nexus.",
        },
      },
      {
        "@type": "Question",
        name: "How do I hire you?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the contact form on this website or reach out via LinkedIn, Twitter, or email to discuss your project requirements.",
        },
      },
    ],
  };

  // BreadcrumbList
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
        name: "Services",
        item: `${siteConfig.url}/services`,
      },
    ],
  };

  return (
    <PageContainer
      title="Services — Test Automation & QA Engineering"
      description="AI-enabled test automation, QA engineering, and software development services."
    >
      <Script
        id="schema-faq-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-breadcrumb-services"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl md:text-6xl leading-tight text-foreground">
            Services
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            AI-enabled test automation, QA engineering, and software development services for enterprise and startup teams.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="p-6 bg-background border border-border rounded-lg hover:bg-accent/50 hover:border-primary/40 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                {resolveIcon(service.icon) ? (
                  React.createElement(resolveIcon(service.icon), {
                    className: "w-6 h-6",
                  })
                ) : (
                  <span className="w-6 h-6" />
                )}
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, fIdx) => (
                  <li
                    key={fIdx}
                    className="flex items-center gap-2 text-xs text-foreground/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a
            href="/contact"
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-lg"
          >
            Get Started
          </a>
        </div>
      </div>
    </PageContainer>
  );
}
