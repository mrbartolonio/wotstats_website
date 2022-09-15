/*
  Warnings:

  - Changed the type of `playerID` on the `Playerstats` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Playerstats" DROP COLUMN "playerID",
ADD COLUMN     "playerID" INTEGER NOT NULL;
