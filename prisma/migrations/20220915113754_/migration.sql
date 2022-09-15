/*
  Warnings:

  - You are about to drop the column `dateTime` on the `Playerstats` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerID,region,created]` on the table `Playerstats` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Playerstats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Playerstats" DROP COLUMN "dateTime",
ADD COLUMN     "created" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Playerstats_playerID_region_created_key" ON "Playerstats"("playerID", "region", "created");
