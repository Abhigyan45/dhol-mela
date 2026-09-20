/*
  Warnings:

  - You are about to drop the column `text` on the `SafetyRule` table. All the data in the column will be lost.
  - Added the required column `textEn` to the `SafetyRule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SafetyRule" DROP COLUMN "text",
ADD COLUMN     "textEn" TEXT NOT NULL,
ADD COLUMN     "textHi" TEXT;
