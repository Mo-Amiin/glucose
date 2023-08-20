-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "adminId" INTEGER;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;
