import { PrismaClient } from "@prisma/client";
import GallerySection from "./GallerySection";

const prisma = new PrismaClient();

export default async function GallerySectionServer() {
  const photos = await prisma.galleryPhoto.findMany({
    orderBy: { createdAt: "desc" },
    take: 4,
  });
  return <GallerySection photos={photos} />;
}