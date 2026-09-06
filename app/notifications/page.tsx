import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";
import NotificationsPageContent from "@/components/NotificationsPageContent";

const prisma = new PrismaClient();

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Navbar />
      <NotificationsPageContent notifications={notifications} />
    </main>
  );
}