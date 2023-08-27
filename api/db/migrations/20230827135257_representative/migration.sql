-- CreateTable
CREATE TABLE "Representative" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "invertedOrderName" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "state" TEXT NOT NULL,
    "district" INTEGER,
    "currentChamber" TEXT NOT NULL,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("id")
);
