// "use client";

// import { useLanguage } from "@/context/LanguageContext";

// const content = {
//   en: { heading: "📰 Latest Mela News", empty: "No news yet — check back soon.",},
//   hi: { heading: "📰 ताज़ा मेला समाचार", empty: "अभी कोई समाचार नहीं — जल्द ही देखें।", },
// };

// type News = { id: string; title: string; summary: string; content: string | null; createdAt: string | Date };

// export default function NewsPageContent({ newsItems }: { newsItems: News[] }) {
//   const { lang } = useLanguage();
//   const t = content[lang];

//   return (
//     <section className="max-w-4xl mx-auto px-4 py-16">
//       <h1 className="text-3xl font-bold mb-8">{t.heading}</h1>
//       {newsItems.length === 0 ? (
//         <p className="text-gray-500">{t.empty}</p>
//       ) : (
//         <div className="space-y-4">
//           {newsItems.map((item) => (
//             <div key={item.id} className="border rounded-xl p-5">
//               <p className="text-sm text-gray-400 mb-1">{new Date(item.createdAt).toLocaleDateString()}</p>
//               <h2 className="font-semibold text-lg mb-2">{item.title}</h2>
//               <p className="text-gray-600">{item.summary}</p>
//               {item.content && <p className="text-gray-700 mt-3 whitespace-pre-line">{item.content}</p>}
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// }


"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Newspaper } from "lucide-react";

const content = {
  en: { heading: "Latest Mela News", empty: "No news yet — check back soon." },
  hi: { heading: "ताज़ा मेला समाचार", empty: "अभी कोई समाचार नहीं — जल्द ही देखें।" },
};

type News = {
  id: string; title: string; summary: string; content: string | null;
  mediaType: string | null; mediaUrl: string | null; createdAt: string | Date;
};

export default function NewsPageContent({ newsItems }: { newsItems: News[] }) {
  const { lang } = useLanguage();
  const t = content[lang];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16 bg-ivory min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Newspaper className="text-gold w-7 h-7" />
        <h1 className="text-3xl font-bold text-maroon">{t.heading}</h1>
      </div>

      {newsItems.length === 0 ? (
        <p className="text-charcoal/50">{t.empty}</p>
      ) : (
        <div className="space-y-6">
          {newsItems.map((item) => (
            <div key={item.id} className="card p-5">
              <p className="text-sm text-gold-dark mb-1">{new Date(item.createdAt).toLocaleDateString()}</p>
              <h2 className="font-semibold text-lg mb-2 text-charcoal">{item.title}</h2>
              <p className="text-charcoal/70">{item.summary}</p>

              {item.mediaType === "photo" && item.mediaUrl && (
                <img src={item.mediaUrl} className="w-full max-h-96 object-cover rounded-xl mt-4" />
              )}
              {item.mediaType === "video" && item.mediaUrl && (
                <video src={item.mediaUrl} controls className="w-full max-h-96 rounded-xl mt-4" />
              )}
              {item.mediaType === "youtube" && item.mediaUrl && (
                <div className="aspect-video mt-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${item.mediaUrl}`}
                    className="w-full h-full rounded-xl"
                    allowFullScreen
                  />
                </div>
              )}

              {item.content && <p className="text-charcoal/80 mt-3 whitespace-pre-line">{item.content}</p>}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}