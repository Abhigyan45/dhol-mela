import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import SponsorsPageContent from "@/components/SponsorsPageContent";
import FadeIn from "@/components/FadeIn";   

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function SponsorsPage() {
  const sponsors = await prisma.sponsor.findMany({ orderBy: { order: "asc" } });

  return (
    <main>
      <Navbar />
        <FadeIn>
      <SponsorsPageContent sponsors={sponsors} />
        </FadeIn>
    </main>
  );
}