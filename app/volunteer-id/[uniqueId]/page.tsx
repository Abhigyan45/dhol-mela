import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

type VolunteerForId = {
  id: string;
  name: string;
  phone: string;
  village: string | null;
  photoUrl: string | null;
  status: string;
  uniqueId: string | null;
};

export default async function VolunteerIdPage({ params }: { params: Promise<{ uniqueId: string }> }) {
  const { uniqueId } = await params;
  const volunteers = await prisma.$queryRaw<VolunteerForId[]>`
    SELECT "id", "name", "phone", "village", "photoUrl", "status", "uniqueId"
    FROM "Volunteer"
    WHERE "uniqueId" = ${uniqueId}
    LIMIT 1
  `;
  const volunteer = volunteers[0];

  if (!volunteer || volunteer.status !== "approved") {
    notFound();
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-sm w-full border-2 border-[#7A1F2B] rounded-2xl p-8 text-center">
        <h1 className="text-lg font-bold text-[#7A1F2B] mb-1">Songadhwa Akhra No. 7</h1>
        <p className="text-sm text-gray-500 mb-6">Official Volunteer ID</p>

        {volunteer.photoUrl && (
          <img src={volunteer.photoUrl} alt={volunteer.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
        )}

        <p className="font-mono text-xl font-bold text-[#C9962C] mb-6">{volunteer.uniqueId}</p>

        <div className="text-left space-y-2 mb-8">
          <p><span className="text-gray-500 text-sm">Name:</span> <span className="font-semibold">{volunteer.name}</span></p>
          <p><span className="text-gray-500 text-sm">Phone:</span> <span className="font-semibold">{volunteer.phone}</span></p>
          {volunteer.village && <p><span className="text-gray-500 text-sm">Village:</span> <span className="font-semibold">{volunteer.village}</span></p>}
        </div>

        <a
          href={`/api/volunteer-id/${volunteer.uniqueId}/pdf`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-700"
        >
          📄 Download ID Card (PDF)
        </a>
      </div>
    </main>
  );
}