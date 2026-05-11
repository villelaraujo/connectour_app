-- DropForeignKey
ALTER TABLE "Log" DROP CONSTRAINT "Log_logbookId_fkey";

-- DropForeignKey
ALTER TABLE "Logbook" DROP CONSTRAINT "Logbook_userId_fkey";

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Log" ADD CONSTRAINT "Log_logbookId_fkey" FOREIGN KEY ("logbookId") REFERENCES "Logbook"("id") ON DELETE CASCADE ON UPDATE CASCADE;
