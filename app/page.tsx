import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import NotificationBanner from "@/components/NotificationBanner";
import HistorySection from "@/components/HistorySection";
import NewsSection from "@/components/NewsSection";
import GallerySection from "@/components/GallerySection";
import Committee from "@/components/Committee";

export default function Home() {
  return (
    <main>
      <Navbar />
      <NotificationBanner />
      <Hero />
      <HistorySection />
      <NewsSection />
      <GallerySection />
      <Committee />
    </main>
  );
}