import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { Icons } from "@/components/common/icons";
import ProjectDescription from "@/components/projects/project-description";
import { buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Projects } from "@/config/projects";
import { siteConfig } from "@/config/site";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";
import Script from "next/script";

interface ProjectPageProps {
  params: Promise<{
    projectId: string;
  }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { projectId } = await params;
  const project = Projects.find((val) => val.id === projectId);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.companyName} | Projects`,
    description: project.shortDescription,
    alternates: {
      canonical: `${siteConfig.url}/projects/${projectId}`,
    },
    openGraph: {
      title: project.companyName,
      description: project.shortDescription,
      url: `${siteConfig.url}/projects/${projectId}`,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: project.companyLogoImg,
          width: 1200,
          height: 630,
          alt: project.companyName,
        },
      ],
    },
  };
}

export default async function Project({ params }: ProjectPageProps) {
  const { projectId } = await params;
  let project = Projects.find((val) => val.id === projectId);
  if (!project) {
    redirect("/projects");
  }

  // Review / AggregateRating schema for project
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "SoftwareApplication",
      name: project.companyName,
    },
    author: {
      "@type": "Person",
      name: siteConfig.authorName,
    },
    datePublished: project.startDate.toISOString(),
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Offer schema for Nexus products
  const offerSchema =
    project.companyName === "Nexus"
      ? {
          "@context": "https://schema.org",
          "@type": "Offer",
          itemOffered: {
            "@type": "SoftwareApplication",
            name: project.companyName,
          },
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
          seller: {
            "@type": "Organization",
            name: siteConfig.authorName,
            url: siteConfig.url,
          },
        }
      : null;

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      {reviewSchema && (
        <Script
          id="schema-review"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      )}
      {offerSchema && (
        <Script
          id="schema-offer"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(offerSchema) }}
        />
      )}
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        All Projects
      </Link>
      <div>
        <time
          dateTime={project.startDate.toISOString()}
          className="block text-sm text-muted-foreground"
        >
          {formatDateFromObj(project.startDate)}
        </time>
        <h1 className="flex items-center justify-between mt-2 font-heading text-4xl leading-tight lg:text-5xl">
          {project.companyName}
          <div className="flex items-center">
            {project.githubLink && (
              <CustomTooltip text="Link to the source code.">
                <Link href={project.githubLink} target="_blank">
                  <Icons.gitHub className="w-6 ml-4 text-muted-foreground hover:text-foreground" />
                </Link>
              </CustomTooltip>
            )}
            {project.websiteLink && (
              <CustomTooltip text="Please note that some project links may be temporarily unavailable.">
                <Link href={project.websiteLink} target="_blank">
                  <Icons.externalLink className="w-6 ml-4 text-muted-foreground hover:text-foreground " />
                </Link>
              </CustomTooltip>
            )}
          </div>
        </h1>
        <ChipContainer textArr={project.category} />
        <div className="mt-4 flex space-x-4">
          <Link
            href={siteConfig.links.github}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={profileImg}
              alt={siteConfig.authorName}
              width={42}
              height={42}
              className="rounded-full bg-background"
            />

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{siteConfig.authorName}</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <Image
        src={project.companyLogoImg}
        alt={project.companyName}
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors"
        decoding="async"
        loading="lazy"
      />

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Tech Stack
        </h2>
        <ChipContainer textArr={project.techStack} />
      </div>

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Description
        </h2>
        <ProjectDescription
          paragraphs={project.descriptionDetails.paragraphs}
          bullets={project.descriptionDetails.bullets}
        />
      </div>

      {project.pagesInfoArr.length > 0 && (
        <div className="mb-7 ">
          <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-5">
            Page Info
          </h2>
          {project.pagesInfoArr.map((page, ind) => (
            <div key={ind}>
              <h3 className="flex items-center font-heading text-xl leading-tight lg:text-xl mt-3">
                <Icons.star className="h-5 w-5 mr-2" /> {page.title}
              </h3>
              <div>
                <p>{page.description}</p>
                {page.imgArr.map((img, ind) => (
                  <Image
                    src={img}
                    key={ind}
                    alt={img}
                    width={720}
                    height={405}
                    className="my-4 rounded-md border bg-muted transition-colors"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
