-- CreateTable
CREATE TABLE "glucose" (
    "id" SERIAL NOT NULL,
    "data" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "state" TEXT NOT NULL DEFAULT '',
    "reportID" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "glucose_id_key" ON "glucose"("id");

-- AddForeignKey
ALTER TABLE "glucose" ADD CONSTRAINT "glucose_reportID_fkey" FOREIGN KEY ("reportID") REFERENCES "Report"("id") ON DELETE SET NULL ON UPDATE CASCADE;
