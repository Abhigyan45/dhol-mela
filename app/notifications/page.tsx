import Navbar from "@/components/Navbar";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function NotificationsPage() {
  const notifications = await prisma.notification.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <Navbar />
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">📢 Notifications</h1>
        {notifications.length === 0 ? (
          <p className="text-gray-500">No notifications right now.</p>
        ) : (
          <div className="space-y-3">
            {notifications.map((n: typeof notifications[number]) => (
              <div key={n.id} className="border-l-4 border-orange-600 bg-orange-50 rounded-r-lg p-4">
                <p className="text-sm text-gray-400 mb-1">
                  {new Date(n.createdAt).toLocaleDateString()}
                </p>
                <p className="text-gray-800">{n.message}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}