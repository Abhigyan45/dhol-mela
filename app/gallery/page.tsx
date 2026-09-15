import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import GalleryPageContent from "@/components/GalleryPageContent";
import FadeIn from "@/components/FadeIn";


const prisma = new PrismaClient();
export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: [{ year: "desc" }, { category: "asc" }],
  });

  return (
    <main>
      <Navbar />
      <FadeIn>
        <GalleryPageContent photos={photos} />
      </FadeIn>
    </main>
  );
}