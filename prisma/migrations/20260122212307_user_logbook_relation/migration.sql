/*
  Warnings:

  - Added the required column `userId` to the `Logbook` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Logbook" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Logbook" ADD CONSTRAINT "Logbook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
