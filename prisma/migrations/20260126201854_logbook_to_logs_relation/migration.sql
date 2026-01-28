/*
  Warnings:

  - Added the required column `logbookId` to the `Log` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Log" ADD COLUMN     "logbookId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_logbookId_fkey" FOREIGN KEY ("logbookId") REFERENCES "Logbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
