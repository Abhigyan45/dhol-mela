export default function sitemap() {
  const base = "https://songadhwadholmela.vercel.app";
  const pages = [
    "", "about", "history", "village", "news", "notifications", "gallery",
    "committee", "schedule", "donate", "location", "contact", "live",
    "search", "volunteer", "sponsors", "archive", "rules-safety", "terms",
  ];

  return pages.map((page) => ({
    url: `${base}/${page}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: page === "" ? 1 : 0.7,
  }));
}