-- CreateTable
CREATE TABLE "notification" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "notification_id_key" ON "notification"("id");
