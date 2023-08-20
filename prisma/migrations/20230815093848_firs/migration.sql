-- CreateTable
CREATE TABLE "patient" (
    "patientID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "tell" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accountType" TEXT NOT NULL DEFAULT 'PATIENT',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceToken" TEXT NOT NULL DEFAULT ''
);

-- CreateIndex
CREATE UNIQUE INDEX "patient_patientID_key" ON "patient"("patientID");

-- CreateIndex
CREATE UNIQUE INDEX "patient_name_key" ON "patient"("name");

-- CreateIndex
CREATE UNIQUE INDEX "patient_tell_key" ON "patient"("tell");
