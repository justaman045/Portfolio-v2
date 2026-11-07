import { siteConfig } from "@/config/site";
import { getAllBlogsMeta } from "@/lib/blogs";

export async function GET(): Promise<Response> {
  const blogs = await getAllBlogsMeta();
  const baseUrl = siteConfig.url;
  const siteName = siteConfig.name;
  const authorName = siteConfig.authorName;
  const siteUrl = baseUrl;

  const itemsXml = blogs
    .map(
      (blog) => `
    <item>
      <title><![CDATA[${blog.title}]]></title>
      <link>${siteConfig.url}/blogs/${blog.slug}</link>
      <guid isPermaLink="false">${siteConfig.url}/blogs/${blog.slug}</guid>
      <description><![CDATA[${blog.description}]]></description>
      <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
      <author>${authorName}</author>
      <category>${blog.tags.join("</category><category>")}</category>
      ${blog.coverImage ? `<media:content url="${siteConfig.url}${blog.coverImage}" medium="image" />` : ""}
    </item>
  `
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title><![CDATA[${siteName} — Blog]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${siteConfig.description}]]></description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <language>en-US</language>
    <managingEditor>${authorName}</managingEditor>
    <webMaster>${authorName}</webMaster>
    <image>
      <url>${siteConfig.ogImage}</url>
      <title>${siteName}</title>
      <link>${siteUrl}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
