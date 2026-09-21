import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import SponsorsPageContent from "@/components/SponsorsPageContent";
import FadeIn from "@/components/FadeIn";   

export const metadata = {
  title: "Sponsors - Songadhwa Akhra No-7 Dhol Mela",
  description: "Sponsors supporting the Songadhwa Akhra No-7 Dhol Mela.",
};

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