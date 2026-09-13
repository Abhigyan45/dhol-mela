import { getYouTubeEmbedUrl, isDirectVideoFile } from "@/lib/video";

type Item = { id: string; url: string; type: string; caption: string | null };

export default function GalleryItem({ item }: { item: Item }) {
  if (item.type === "video") {
    const youtubeEmbed = getYouTubeEmbedUrl(item.url);
    if (youtubeEmbed) {
      return (
        <div className="w-full aspect-square rounded-xl overflow-hidden">
          <iframe
            src={youtubeEmbed}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={item.caption ?? "Gallery video"}
          />
        </div>
      );
    }
    if (isDirectVideoFile(item.url)) {
      return (
        <video controls className="w-full aspect-square object-cover rounded-xl bg-black">
          <source src={item.url} />
        </video>
      );
    }
    // Fallback if the video URL type couldn't be detected
    return (
      <a href={item.url} target="_blank" rel="noopener noreferrer" className="w-full aspect-square rounded-xl bg-gray-900 text-white flex items-center justify-center text-3xl">
        ▶️
      </a>
    );
  }

  return (
    <img src={item.url} alt={item.caption ?? ""} className="w-full aspect-square object-cover rounded-xl" />
  );
}