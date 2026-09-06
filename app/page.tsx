import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NotificationBanner from "@/components/NotificationBanner";
import HistorySection from "@/components/HistorySection";
import NewsSectionServer from "@/components/NewsSectionServer";
import GallerySectionServer from "@/components/GallerySectionServer";
import CommitteeServer from "@/components/CommitteeServer";
import SponsorsSection from "@/components/SponsorsSection";

export default function Home() {
  return (
    <main>
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