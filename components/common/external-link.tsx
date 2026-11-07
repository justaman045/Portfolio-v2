"use client";

import Link from "next/link";

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  label?: string;
}

/**
 * External link component with GA4 outbound click tracking.
 * Opens in a new tab with proper security attributes.
 */
export function ExternalLink({
  href,
  children,
  label,
  className,
  ...props
}: ExternalLinkProps) {
  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "click", {
        event_category: "outbound",
        event_label: label || href,
        link_url: href,
      });
    }
  };

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={className}
      aria-label={label}
      {...props}
    >
      {children}
    </Link>
  );
}
