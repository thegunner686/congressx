/*
  Warnings:

  - Added the required column `abbreviation` to the `State` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "State" ADD COLUMN     "abbreviation" TEXT NOT NULL;
