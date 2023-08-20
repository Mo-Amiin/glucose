-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "patientId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adminId" INTEGER
);

-- CreateTable
CREATE TABLE "BodyTemp" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "reportID" INTEGER
);

-- CreateTable
CREATE TABLE "RoomTemp" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "reportID" INTEGER
);

-- CreateTable
CREATE TABLE "Heart" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "state" TEXT NOT NULL DEFAULT '',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reportID" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_id_key" ON "Report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BodyTemp_id_key" ON "BodyTemp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RoomTemp_id_key" ON "RoomTemp"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Heart_id_key" ON "Heart"("id");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("patientID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "admin"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BodyTemp" ADD CONSTRAINT "BodyTemp_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTemp" ADD CONSTRAINT "RoomTemp_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heart" ADD CONSTRAINT "Heart_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
