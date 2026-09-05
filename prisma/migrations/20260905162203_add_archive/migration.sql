-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Archive_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArchivePhoto" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "caption" TEXT,
    "archiveId" TEXT NOT NULL,

    CONSTRAINT "ArchivePhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ArchivePhoto" ADD CONSTRAINT "ArchivePhoto_archiveId_fkey" FOREIGN KEY ("archiveId") REFERENCES "Archive"("id") ON DELETE CASCADE ON UPDATE CASCADE;
