-- AlterTable
ALTER TABLE "notification" ADD COLUMN     "patientId" TEXT;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("patientID") ON DELETE SET NULL ON UPDATE CASCADE;
