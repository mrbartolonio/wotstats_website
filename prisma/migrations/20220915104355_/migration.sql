-- DropIndex
DROP INDEX "User_email_key";

-- CreateTable
CREATE TABLE "Playerstats" (
    "id" SERIAL NOT NULL,
    "playerID" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "data" JSONB,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Playerstats_pkey" PRIMARY KEY ("id")
);
