-- CreateTable
CREATE TABLE "DonationSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "upiId" TEXT NOT NULL,
    "payeeName" TEXT NOT NULL,

    CONSTRAINT "DonationSettings_pkey" PRIMARY KEY ("id")
);
