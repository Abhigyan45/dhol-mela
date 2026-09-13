-- CreateTable
CREATE TABLE "MelaSettings" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "melaDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MelaSettings_pkey" PRIMARY KEY ("id")
);
