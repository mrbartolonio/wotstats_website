/*
  Warnings:

  - You are about to drop the column `created` on the `Playerstats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerID,region,date]` on the table `Playerstats` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Playerstats_playerID_region_created_key";

-- AlterTable
ALTER TABLE "Playerstats" DROP COLUMN "created",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "Playerstats_playerID_region_date_key" ON "Playerstats"("playerID", "region", "date");
