import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import NotificationsPageContent from "@/components/NotificationsPageContent";
import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Notifications - Songadhwa Akhra No-7 Dol Mela",
  description: "Latest notifications from the Songadhwa Akhra No-7 Dol Mela committee.",
};

const prisma = new PrismaClient();

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Navbar />
      <FadeIn>
        <NotificationsPageContent notifications={notifications} />
      </FadeIn>
    </main>
  );
}