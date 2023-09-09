-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "stateId" TEXT,
    "districtNumber" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "District" (
    "id" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "representativeId" TEXT NOT NULL,

    CONSTRAINT "District_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Representative" (
    "id" TEXT NOT NULL,
    "birthYear" INTEGER,
    "imageUrl" TEXT,
    "honorificName" TEXT,
    "directOrderName" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "invertedOrderName" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL,
    "stateId" TEXT,

    CONSTRAINT "Representative_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Leadership" (
    "id" TEXT NOT NULL,
    "representativeId" TEXT NOT NULL,
    "congressNumber" INTEGER NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Leadership_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PartyAffiliation" (
    "id" TEXT NOT NULL,
    "representativeId" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,

    CONSTRAINT "PartyAffiliation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Party" (
    "name" TEXT NOT NULL,
    "abbreviation" TEXT NOT NULL,

    CONSTRAINT "Party_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Term" (
    "id" TEXT NOT NULL,
    "chamber" TEXT NOT NULL,
    "congressNumber" INTEGER NOT NULL,
    "memberType" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER,
    "representativeId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "Term_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Congress" (
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "startYear" INTEGER NOT NULL,
    "endYear" INTEGER NOT NULL,

    CONSTRAINT "Congress_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "congressNumber" INTEGER NOT NULL,
    "chamber" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "introducedDate" TIMESTAMP(3) NOT NULL,
    "congressNumber" INTEGER NOT NULL,
    "originChamber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillAction" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "billId" TEXT NOT NULL,

    CONSTRAINT "BillAction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillTextVersion" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "htmlUrl" TEXT,
    "pdfUrl" TEXT,

    CONSTRAINT "BillTextVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSubject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "BillSubject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BillSummary" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "actionDate" TIMESTAMP(3) NOT NULL,
    "actionDescription" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "updateDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BillSummary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voting" (
    "id" TEXT NOT NULL,
    "billId" TEXT NOT NULL,
    "congress" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "rollCallNumber" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "Voting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RepresentativeVote" (
    "id" TEXT NOT NULL,
    "votingId" TEXT NOT NULL,
    "representativeId" TEXT NOT NULL,
    "result" TEXT NOT NULL,

    CONSTRAINT "RepresentativeVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "billId" TEXT,
    "pollId" TEXT,

    CONSTRAINT "Vote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "billId" TEXT,
    "pollId" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Poll" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "districtNumber" INTEGER,
    "userId" TEXT NOT NULL,
    "createdOn" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Poll_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RepresentativeToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CongressToRepresentative" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_BillToBillSubject" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SponsoredBills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_CosponsoredBills" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "District_representativeId_key" ON "District"("representativeId");

-- CreateIndex
CREATE INDEX "District_stateId_number_idx" ON "District"("stateId", "number");

-- CreateIndex
CREATE UNIQUE INDEX "District_stateId_number_key" ON "District"("stateId", "number");

-- CreateIndex
CREATE INDEX "PartyAffiliation_representativeId_partyName_startYear_idx" ON "PartyAffiliation"("representativeId", "partyName", "startYear");

-- CreateIndex
CREATE UNIQUE INDEX "PartyAffiliation_representativeId_partyName_startYear_key" ON "PartyAffiliation"("representativeId", "partyName", "startYear");

-- CreateIndex
CREATE INDEX "Session_congressNumber_chamber_number_type_idx" ON "Session"("congressNumber", "chamber", "number", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Session_congressNumber_chamber_number_type_key" ON "Session"("congressNumber", "chamber", "number", "type");

-- CreateIndex
CREATE UNIQUE INDEX "_RepresentativeToUser_AB_unique" ON "_RepresentativeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RepresentativeToUser_B_index" ON "_RepresentativeToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CongressToRepresentative_AB_unique" ON "_CongressToRepresentative"("A", "B");

-- CreateIndex
CREATE INDEX "_CongressToRepresentative_B_index" ON "_CongressToRepresentative"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BillToBillSubject_AB_unique" ON "_BillToBillSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_BillToBillSubject_B_index" ON "_BillToBillSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SponsoredBills_AB_unique" ON "_SponsoredBills"("A", "B");

-- CreateIndex
CREATE INDEX "_SponsoredBills_B_index" ON "_SponsoredBills"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CosponsoredBills_AB_unique" ON "_CosponsoredBills"("A", "B");

-- CreateIndex
CREATE INDEX "_CosponsoredBills_B_index" ON "_CosponsoredBills"("B");
