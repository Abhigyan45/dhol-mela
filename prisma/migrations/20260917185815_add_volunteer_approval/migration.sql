/*
  Warnings:

  - A unique constraint covering the columns `[uniqueId]` on the table `Volunteer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "approvedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending',
ADD COLUMN     "uniqueId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_uniqueId_key" ON "Volunteer"("uniqueId");
