import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const indexPath = resolve(projectRoot, "frontend", "index.html");
const publicDir = resolve(projectRoot, "frontend", "public");

function normalizeSiteUrl(value) {
  const githubPagesUrl = process.env.GITHUB_REPOSITORY
    ? `https://${process.env.GITHUB_REPOSITORY.split("/")[0]}.github.io/${process.env.GITHUB_REPOSITORY.split("/")[1]}`
    : null;
  const fallback = githubPagesUrl || "https://vpn-diagnostics.vercel.app";
  const raw = (value || "").trim() || fallback;
  const withProtocol = raw.startsWith("http://") || raw.startsWith("https://") ? raw : `https://${raw}`;
  return withProtocol.replace(/\/+$/, "");
}

function normalizeBasePath(value) {
  const raw = (value || "/").trim();
  const withLeadingSlash = raw.startsWith("/") ? raw : `/${raw}`;
  return withLeadingSlash.endsWith("/") ? withLeadingSlash : `${withLeadingSlash}/`;
}

const siteUrl = normalizeSiteUrl(
  process.env.VITE_SITE_URL ||
    process.env.SITE_URL ||
    process.env.GITHUB_PAGES_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL
);
const basePath = normalizeBasePath(process.env.VITE_BASE_PATH);

const now = new Date().toISOString();

const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

const manifest = {
  name: "VPN Diagnostics",
  short_name: "VPN Diagnostics",
  description: "Онлайн-панель для проверки VPN, публичного IP, WebRTC leaks, DNS-over-HTTPS и доступности сайтов.",
  start_url: basePath,
  scope: basePath,
  display: "standalone",
  background_color: "#09111f",
  theme_color: "#09111f",
  lang: "ru",
  icons: [
    {
      src: `${basePath}favicon.svg`,
      sizes: "any",
      type: "image/svg+xml",
      purpose: "any"
    }
  ]
};

await mkdir(publicDir, { recursive: true });
const indexHtml = await readFile(indexPath, "utf8");
const normalizedIndexHtml = indexHtml
  .replace(/https:\/\/[^"<>]+\/og-image\.svg/g, `${siteUrl}/og-image.svg`)
  .replace(/https:\/\/[^"<>]+\/(?=["<>])/g, `${siteUrl}/`);

await Promise.all([
  writeFile(indexPath, normalizedIndexHtml, "utf8"),
  writeFile(resolve(publicDir, "robots.txt"), robots, "utf8"),
  writeFile(resolve(publicDir, "sitemap.xml"), sitemap, "utf8"),
  writeFile(resolve(publicDir, "site.webmanifest"), `${JSON.stringify(manifest, null, 2)}\n`, "utf8")
]);

console.log(`SEO files generated for ${siteUrl}`);
