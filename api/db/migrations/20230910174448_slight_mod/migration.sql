/*
  Warnings:

  - Added the required column `chamber` to the `Voting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BillAction" ALTER COLUMN "code" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Voting" ADD COLUMN     "chamber" TEXT NOT NULL;
