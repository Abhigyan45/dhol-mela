import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import GalleryPageContent from "@/components/GalleryPageContent";

const prisma = new PrismaClient();

export default async function GalleryPage() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: [{ year: "desc" }, { category: "asc" }],
  });

  return (
    <main>
      <Navbar />
      <GalleryPageContent photos={photos} />
    </main>
  );
}