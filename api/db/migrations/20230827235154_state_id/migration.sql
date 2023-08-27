/*
  Warnings:

  - The primary key for the `State` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `abbreviation` on the `State` table. All the data in the column will be lost.
  - Added the required column `id` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" DROP CONSTRAINT "State_pkey",
DROP COLUMN "abbreviation",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "State_pkey" PRIMARY KEY ("id");
