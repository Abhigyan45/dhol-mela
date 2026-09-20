import Navbar from "@/components/Navbar";
import FadeIn from "@/components/FadeIn";
import { PrismaClient } from "@prisma/client";
import RulesSafetyContent from "@/components/RulesSafetyContent";

const prisma = new PrismaClient();

export const dynamic = "force-dynamic";

export default async function RulesSafetyPage() {
  const rules = await prisma.safetyRule.findMany({ orderBy: { order: "asc" } });

  return (
    <main>
      <Navbar />
      <RulesSafetyContent rules={rules} />
    </main>
  );
}