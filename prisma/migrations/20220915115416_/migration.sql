/*
  Warnings:

  - You are about to drop the column `date` on the `Playerstats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerID,region,createdAt]` on the table `Playerstats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Playerstats_playerID_region_date_key";

-- AlterTable
ALTER TABLE "Playerstats" DROP COLUMN "date",
ALTER COLUMN "createdAt" SET DATA TYPE DATE;

-- CreateIndex
CREATE UNIQUE INDEX "Playerstats_playerID_region_createdAt_key" ON "Playerstats"("playerID", "region", "createdAt");
