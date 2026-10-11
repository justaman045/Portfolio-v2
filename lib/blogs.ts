import fs from "fs";
import path from "path";

import { XMLParser } from "fast-xml-parser";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

import { portfolio } from "@/config/content";
import { siteConfig } from "@/config/site";

const BLOGS_DIR = path.join(process.cwd(), "content/blogs");

export type BlogSource = "local" | "devto" | "hashnode" | "medium" | "codedamn";

export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  coverImage?: string;
  readingTime?: number;
  featured?: boolean;
}

export interface BlogMeta extends BlogFrontmatter {
  slug: string;
  source: BlogSource;
  /** Canonical URL on the source platform (used for dedup and outbound links). */
  canonicalUrl?: string;
  /** Outbound URL to the original post, when hosted externally. */
  externalUrl?: string;
}

export interface BlogPost extends BlogMeta {
  contentHtml: string;
}

function ensureBlogsDir() {
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
  }
}

/** Returns all local blog slugs (file names without .md) */
export function getAllBlogSlugs(): string[] {
  ensureBlogsDir();
  return fs
    .readdirSync(BLOGS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function mapLocalSlug(slug: string): BlogMeta {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  return {
    slug,
    source: "local",
    canonicalUrl: `${siteConfig.url}/blogs/${slug}`,
    ...(data as BlogFrontmatter),
  } as BlogMeta;
}

/** Returns metadata for all local blogs, sorted newest first */
export function getLocalBlogsMeta(): BlogMeta[] {
  return getAllBlogSlugs()
    .map(mapLocalSlug)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Returns full local blog post (metadata + parsed HTML content) */
export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOGS_DIR, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  return {
    slug,
    source: "local",
    canonicalUrl: `${siteConfig.url}/blogs/${slug}`,
    ...(data as BlogFrontmatter),
    contentHtml: processed.toString(),
  };
}

async function safeFetch(url: string, init?: RequestInit): Promise<Response | null> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) return null;
    return res;
  } catch {
    return null;
  }
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

async function fetchDevTo(): Promise<BlogMeta[]> {
  const username = portfolio.blog.sources.devto?.username?.trim();
  if (!username) return [];

  const res = await safeFetch(
    `https://dev.to/api/articles?username=${encodeURIComponent(
      username
    )}&per_page=100`
  );
  if (!res) return [];

  const articles = (await res.json()) as Array<{
    id: number;
    title: string;
    description: string;
    url: string;
    canonical_url?: string;
    published_at: string;
    tag_list: string[];
    cover_image?: string;
    reading_time_minutes?: number;
  }>;

  return articles.map((a) => ({
    slug: `devto-${a.id}`,
    source: "devto" as const,
    title: a.title,
    description: a.description ?? "",
    date: a.published_at,
    tags: a.tag_list ?? [],
    coverImage: a.cover_image || undefined,
    readingTime: a.reading_time_minutes,
    canonicalUrl: a.canonical_url || a.url,
    externalUrl: a.url,
  }));
}

async function fetchHashnode(): Promise<BlogMeta[]> {
  const username = portfolio.blog.sources.hashnode?.username?.trim();
  if (!username) return [];

  // Hashnode's GraphQL API now requires a paid (Pro) plan, so we read the
  // publication's public RSS feed instead.
  const res = await safeFetch(
    `https://${encodeURIComponent(username)}.hashnode.dev/rss.xml`
  );
  if (!res) return [];

  try {
    return parseRssFeed(await res.text(), "hashnode");
  } catch {
    return [];
  }
}

const xmlParser = new XMLParser({ ignoreAttributes: false });

function asArray<T>(value: T | T[] | undefined): T[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

function parseRssFeed(
  xml: string,
  source: "medium" | "codedamn" | "hashnode"
): BlogMeta[] {
  const parsed = xmlParser.parse(xml) as {
    rss?: { channel?: { item?: unknown } };
    feed?: { entry?: unknown };
  };

  const rawItems = parsed.rss?.channel?.item ?? parsed.feed?.entry;
  const items = asArray(rawItems as Record<string, unknown>[]);

  return items.map((item: any, index) => {
    const link =
      (typeof item.link === "string" ? item.link : item.link?.["@_href"]) ?? "";
    const title = typeof item.title === "string" ? item.title : item.title?.["#text"] ?? "Untitled";
    const date = item.pubDate ?? item.published ?? item.updated ?? new Date().toISOString();
    const descriptionRaw = item.description ?? item.summary ?? item["content:encoded"] ?? "";
    const description = stripHtml(
      typeof descriptionRaw === "string" ? descriptionRaw : descriptionRaw?.["#text"] ?? ""
    );
    const tags = asArray(item.category).map((c: any) =>
      typeof c === "string" ? c : c?.["@_term"] ?? c?.["#text"] ?? ""
    ).filter(Boolean);
    const coverRaw =
      item.enclosure?.["@_url"] ??
      item["media:content"]?.["@_url"] ??
      item["media:thumbnail"]?.["@_url"] ??
      item["media:content"]?.url;

    return {
      slug: `${source}-${index}`,
      source,
      title,
      description: description.slice(0, 280),
      date: new Date(date).toISOString(),
      tags,
      canonicalUrl: link,
      externalUrl: link,
      ...(typeof coverRaw === "string" && coverRaw ? { coverImage: coverRaw } : {}),
    };
  });
}

async function fetchFeed(source: "medium" | "codedamn"): Promise<BlogMeta[]> {
  const config = portfolio.blog.sources[source];
  if (!config) return [];

  let feedUrl = "";
  if (source === "medium") {
    const username = (config as { username?: string }).username?.trim();
    if (!username) return [];
    feedUrl = `https://medium.com/feed/@${encodeURIComponent(username)}`;
  } else {
    const host = (config as { host?: string }).host?.trim();
    if (!host) return [];
    feedUrl = host;
  }

  const res = await safeFetch(feedUrl);
  if (!res) return [];
  try {
    return parseRssFeed(await res.text(), source);
  } catch {
    return [];
  }
}

function normalizeKey(blog: BlogMeta): string {
  if (blog.canonicalUrl) {
    return blog.canonicalUrl
      .toLowerCase()
      .replace(/^https?:\/\//, "")
      .replace(/\/+$/, "");
  }
  return blog.title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function normalizeTitleKey(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

/**
 * Aggregates local + external posts, deduplicates overlapping posts
 * (same canonical URL or normalized title) honouring the configured source
 * priority, and returns everything sorted newest first.
 */
export async function getAllBlogsMeta(): Promise<BlogMeta[]> {
  const priority = portfolio.blog.priority;

  const [devto, hashnode, medium, codedamn] = await Promise.all([
    fetchDevTo(),
    fetchHashnode(),
    fetchFeed("medium"),
    fetchFeed("codedamn"),
  ]);

  const ignore = new Set(
    portfolio.blog.ignoreTitles.map((t) => normalizeTitleKey(t))
  );

  const all = [
    ...getLocalBlogsMeta(),
    ...devto,
    ...hashnode,
    ...medium,
    ...codedamn,
  ].filter((blog) => !ignore.has(normalizeTitleKey(blog.title)));

  const priorityOf = (source: BlogSource) => {
    const index = priority.indexOf(source);
    return index === -1 ? priority.length : index;
  };

  const ranked = all.slice().sort((a, b) => {
    const byPriority = priorityOf(a.source) - priorityOf(b.source);
    if (byPriority !== 0) return byPriority;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const seenCanonical = new Set<string>();
  const seenTitle = new Set<string>();
  const deduped: BlogMeta[] = [];
  for (const blog of ranked) {
    const key = normalizeKey(blog);
    const titleKey = normalizeTitleKey(blog.title);
    if (seenCanonical.has(key) || (titleKey && seenTitle.has(titleKey)))
      continue;
    seenCanonical.add(key);
    if (titleKey) seenTitle.add(titleKey);
    deduped.push(blog);
  }

  return deduped.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Returns the featured blogs (from JSON overrides), falling back to the latest 3 */
export async function getFeaturedBlogs(): Promise<BlogMeta[]> {
  const all = await getAllBlogsMeta();
  const configured = portfolio.blog.featured;
  if (configured.length > 0) {
    const featured = all.filter((blog) =>
      configured.some(
        (key) => key === blog.canonicalUrl || key === blog.title
      )
    );
    if (featured.length > 0) return featured.slice(0, 3);
  }
  const localFeatured = all.filter((b) => b.featured);
  if (localFeatured.length > 0) return localFeatured.slice(0, 3);
  return all.slice(0, 3);
}
