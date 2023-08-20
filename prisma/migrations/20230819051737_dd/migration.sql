-- AlterTable
ALTER TABLE "BodyTemp" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Body Temperature';

-- AlterTable
ALTER TABLE "Heart" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Heart Beat';

-- AlterTable
ALTER TABLE "RoomTemp" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'Room Temperature';

-- AlterTable
ALTER TABLE "glucose" ADD COLUMN     "type" TEXT NOT NULL DEFAULT 'blood sugar';
