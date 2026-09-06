import { PrismaClient } from "@prisma/client";
import Committee from "./Committee";

const prisma = new PrismaClient();

export default async function CommitteeServer() {
  const members = await prisma.member.findMany({ orderBy: { order: "asc" } });
  return <Committee members={members} />;
}