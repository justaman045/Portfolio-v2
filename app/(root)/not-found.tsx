import { Metadata } from "next";
import Link from "next/link";
import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Page Not Found | " + siteConfig.name,
  description: "The page you're looking for doesn't exist. Explore my projects, experience, and blogs.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
      <Script
        id="schema-not-found"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Page Not Found",
            description:
              "The page you're looking for doesn't exist. Explore my projects, experience, and blogs.",
            url: `${siteConfig.url}/404`,
            isPartOf: {
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }),
        }}
      />
      <div className="max-w-md">
        <div className="text-9xl font-bold text-muted-foreground">404</div>
        <h1 className="text-3xl font-heading font-bold text-foreground mb-4">
          Page Not Found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Go to Home
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icons.chevronRight className="w-4 h-4" />
            <span>Or explore:</span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4 sm:mt-0">
            <Link
              href="/projects"
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
            >
              Blogs
            </Link>
            <Link
              href="/experience"
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
            >
              Experience
            </Link>
            <Link
              href="/contact"
              className="px-4 py-2 border border-border rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors text-sm"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
