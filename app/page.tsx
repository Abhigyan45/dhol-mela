// import Navbar from "@/components/Navbar";
// import Hero from "@/components/Hero";
// import NotificationBanner from "@/components/NotificationBanner";
// import HistorySection from "@/components/HistorySection";
// import NewsSectionServer from "@/components/NewsSectionServer";
// import GallerySectionServer from "@/components/GallerySectionServer";
// import CommitteeServer from "@/components/CommitteeServer";
// import SponsorsSection from "@/components/SponsorsSection";
// export const dynamic = "force-dynamic";

// export default function Home() {
//   return (
//     <main>
//       <Navbar />
//       <NotificationBanner />
//       <Hero />
//       <HistorySection />
//       <NewsSectionServer />
//       <GallerySectionServer />
//       <CommitteeServer />
//       <SponsorsSection />
//     </main>
//   );
// }
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NotificationBanner from "@/components/NotificationBanner";
import HistorySection from "@/components/HistorySection";
import NewsSectionServer from "@/components/NewsSectionServer";
import GallerySectionServer from "@/components/GallerySectionServer";
import CommitteeServer from "@/components/CommitteeServer";
import SponsorsSection from "@/components/SponsorsSection";
import FadeIn from "@/components/FadeIn";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Songadhwa Dhol Mela | सोनगढ़वा ढोल मेला | Akhra No. 7",
  description:
    "Songadhwa Dhol Mela — Akhra No. 7, Gopalganj, Bihar. सोनगढ़वा ढोल मेला आखड़ा नंबर 7। Official website with dates, schedule, gallery, history, and donations for the annual Songadhwa Akhra No-7 Dhol Mela.",
  keywords: [
    "Songadhwa Dhol Mela",
    "Songadhwa Dhol Mela Akhra 7",
    "Songadhwa Akhra No 7",
    "सोनगढ़वा ढोल मेला",
    "सोनगढ़वा ढोल मेला आखड़ा नंबर 7",
    "Gopalganj Dhol Mela",
    "Bairagitola Dhol Mela",
    "Songadhwa",
    "Dhol Mela",
    "Akhra No. 7",
    "Akhra No 7",
    "सोनगढ़वा",
    "songarhwa",
    "songarhwa dhol mela",
    "songarhwa dhol mela akhra 7",
    "songarhwa dhol mela akhra no 7",
    "bihar dhol mela",
    "bihar dhol mela 2026",
    "songadhwa dhol mela 2026",
    "Songadhwa Akhra No. 7 Committee",
    "Songadhwa Village Dhol Mela",
    "Mahaviri Akhada Gopalganj",
    "गोपालगंज ढोल मेला",
    "गोपालगंज ढोल मेला 2026",
    "बैरागीटोला मेला",
    "बैरागीटोला ढोल मेला",
    "बैरागीटोला ढोल मेला 2026",
  ],
};

// export default function Home() {
//   return (
//     <main>
//       <Navbar />
//       <NotificationBanner />
//       <Hero />
//       <FadeIn><HistorySection /></FadeIn>
//       <FadeIn><NewsSectionServer /></FadeIn>
//       <FadeIn><GallerySectionServer /></FadeIn>
//       <FadeIn><CommitteeServer /></FadeIn>
//       <FadeIn><SponsorsSection /></FadeIn>
//     </main>
//   );
export default function Home() {
const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Songadhwa Akhra No-7 Dhol Mela",
  alternateName: "सोनगढ़वा ढोल मेला आखड़ा नंबर 7",
  description:
    "Annual Dhol Mela celebrated by Songadhwa Akhra No. 7 — Mahaviri Akhada procession, holy Dols, Dhol performances, Lathi-Khel martial arts, and cultural programme.",
  startDate: "2026-10-29T16:00:00+05:30",
  endDate: "2026-10-30T22:00:00+05:30",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  location: {
    "@type": "Place",
    name: "Songadhwa, Bairagitola",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Songadhwa, Bairagitola",
      addressRegion: "Bihar",
      postalCode: "841425",
      addressCountry: "IN",
    },
  },
  organizer: {
    "@type": "Organization",
    name: "Songadhwa Akhra No. 7 Committee",
    url: "https://songadhwadholmela.vercel.app",
  },
  performer: {
    "@type": "Organization",
    name: "Songadhwa Akhra No. 7",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
    url: "https://songadhwadholmela.vercel.app",
  },
  image: ["https://songadhwadholmela.vercel.app/images/banner.png"],
};

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Navbar />
      <NotificationBanner />
      <Hero />
      <HistorySection />
      <NewsSectionServer />
      <GallerySectionServer />
      <CommitteeServer />
      <SponsorsSection />
    </main>
  );
}
