/*
  Warnings:

  - You are about to drop the column `used_by_user_id` on the `cards` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "cards" DROP CONSTRAINT "cards_used_by_user_id_fkey";

-- DropIndex
DROP INDEX "idx_cards_used_by_user_id";

-- AlterTable
ALTER TABLE "cards" DROP COLUMN "used_by_user_id";

-- CreateTable
CREATE TABLE "card_users" (
    "id" BIGSERIAL NOT NULL,
    "card_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_card_users_user_id" ON "card_users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_card_users_card_id_user_id" ON "card_users"("card_id", "user_id");

-- AddForeignKey
ALTER TABLE "card_users" ADD CONSTRAINT "card_users_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_users" ADD CONSTRAINT "card_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
