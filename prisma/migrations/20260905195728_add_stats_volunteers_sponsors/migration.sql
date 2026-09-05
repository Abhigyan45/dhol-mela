-- CreateTable
CREATE TABLE "SiteStats" (
    "id" TEXT NOT NULL DEFAULT 'main',
    "visitorCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "SiteStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "village" TEXT,
    "interest" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sponsor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logoUrl" TEXT,
    "contribution" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sponsor_pkey" PRIMARY KEY ("id")
);
