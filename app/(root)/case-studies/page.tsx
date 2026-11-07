import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import { siteConfig } from "@/config/site";
import Script from "next/script";

export const metadata: Metadata = {
  title: `Case Studies — Software Development & QA Engineering | ${siteConfig.name}`,
  description:
    "In-depth case studies on test automation, QA engineering, and software development projects.",
  alternates: {
    canonical: `${siteConfig.url}/case-studies`,
  },
};

const caseStudies = [
  {
    id: "coles-mate-wave-3",
    title: "Coles MATE Wave 3 — Unified Test Framework",
    company: "Infosys Ltd.",
    role: "QA Automation Engineer",
    duration: "2023 — Present",
    location: "Gurgaon, Haryana",
    problem:
      "The Coles MATE project had separate API and mobile test suites with duplicated effort. REST Assured API automation and Appium mobile automation were maintained independently, leading to inconsistent coverage and slower regression cycles.",
    solution:
      "Architected a unified test framework integrating REST Assured API automation into the existing Appium mobile suite via shared MessageFactory classes. This enabled full API and mobile test coverage with zero codebase refactoring.",
    results: [
      "Full API and mobile test coverage with zero refactoring",
      "Significantly accelerated test delivery — recognized by the client",
      "Structured Extent Reports with per-field validations reduced debugging time",
      "Reliable test execution across iterative release cycles",
    ],
    techStack: [
      "REST Assured",
      "Appium",
      "Selenium",
      "Java",
      "TestNG",
      "Page Object Model",
      "Extent Reports",
      "Kafka",
    ],
    category: "QA / Automation",
  },
  {
    id: "rms-desktop-automation",
    title: "RMS Desktop Automation Stabilization",
    company: "Retail Management System",
    role: "QA Automation Engineer",
    duration: "2022 — 2023",
    location: "Gurgaon, Haryana",
    problem:
      "Inherited a near-zero-pass-rate desktop automation suite of 200+ scripts built on Selenium and WinAppDriver. Multiple system updates had invalidated element locators across all test modules, making the suite unreliable.",
    solution:
      "Diagnosed root causes across all 200+ failing scripts, systematically updating locators and test logic. Restored full suite-wide coverage in under 6 weeks through methodical root-cause analysis and locator updates.",
    results: [
      "Recovered 200+ failing scripts in under 6 weeks",
      "Full suite-wide coverage restored",
      "Direct client recognition for speed and quality of turnaround",
      "Stable regression suite for ongoing releases",
    ],
    techStack: [
      "Selenium",
      "WinAppDriver",
      "Java",
      "TestNG",
      "Page Object Model",
    ],
    category: "QA / Automation",
  },
  {
    id: "nexus",
    title: "Nexus — Software Company & Storefront",
    company: "Nexus",
    role: "Founder & Full-Stack Engineer",
    duration: "2026 — Present",
    location: "Remote",
    problem:
      "Engineers often build tools and ship them on GitHub but never own the product end-to-end — from pricing to sales to support. This leaves revenue on the table and reduces accountability for quality.",
    solution:
      "Founded Nexus — a software company that designs, engineers, and sells quality software products entirely in-house. Built a complete stack: Next.js storefront, Firebase (Firestore + Auth) catalogue and Vault dashboard, Razorpay checkout with instant license delivery, and an admin portal for product management.",
    results: [
      "Live storefront at nexusprods.vercel.app selling software as instant-delivery licenses",
      "Complete stack built end-to-end: Next.js, Firestore, Firebase Auth, Razorpay",
      "Build-and-sell model with new quality products shipped over time",
      "No resellers or middlemen — direct, per-license revenue",
    ],
    techStack: [
      "Next.js",
      "TypeScript",
      "Firebase",
      "Razorpay",
      "Flutter",
      "Tailwind CSS",
    ],
    category: "Full Stack",
  },
];

export default function CaseStudiesPage() {
  // FAQPage structured data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is a case study?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A detailed analysis of a specific project, including the problem, solution, technologies used, and measurable results.",
        },
      },
      {
        "@type": "Question",
        name: "Can you work on similar projects?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use the contact form to discuss your requirements and I'll get back to you shortly.",
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
        name: "Case Studies",
        item: `${siteConfig.url}/case-studies`,
      },
    ],
  };

  return (
    <PageContainer
      title="Case Studies"
      description="In-depth case studies on test automation, QA engineering, and software development projects."
    >
      <Script
        id="schema-faq-case-studies"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="schema-breadcrumb-case-studies"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="space-y-12">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-6xl leading-tight text-foreground">
            Case Studies
          </h1>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            In-depth looks at test automation, QA engineering, and software
            development projects — from problem to solution to results.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="p-6 bg-background border border-border rounded-lg hover:bg-accent/50 hover:border-primary/40 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                  {study.category}
                </span>
                <span className="text-xs text-muted-foreground">
                  {study.duration}
                </span>
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                {study.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {study.company} — {study.role}
              </p>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Problem
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {study.problem}
              </p>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Solution
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                {study.solution}
              </p>
              <h4 className="text-sm font-semibold text-foreground mb-2">
                Results
              </h4>
              <ul className="space-y-1 mb-4">
                {study.results.map((result, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-sm text-foreground/70"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {result}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {study.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-muted text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
