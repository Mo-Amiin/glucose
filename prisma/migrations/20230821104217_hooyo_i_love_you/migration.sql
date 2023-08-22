-- AlterTable
CREATE SEQUENCE notification_id_seq;
ALTER TABLE "notification" ALTER COLUMN "id" SET DEFAULT nextval('notification_id_seq');
ALTER SEQUENCE notification_id_seq OWNED BY "notification"."id";
