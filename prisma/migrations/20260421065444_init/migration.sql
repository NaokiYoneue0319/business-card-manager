-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'GENERAL');

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "login_id" VARCHAR(50) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'GENERAL',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stores" (
    "id" BIGSERIAL NOT NULL,
    "store_name" VARCHAR(100) NOT NULL,
    "prefecture" VARCHAR(20) NOT NULL,
    "area" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "stores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cards" (
    "id" BIGSERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "store_id" BIGINT NOT NULL,
    "business_detail" TEXT,
    "memo" TEXT,
    "used_at" TIMESTAMP(3) NOT NULL,
    "used_by_user_id" BIGINT NOT NULL,
    "front_image_url" VARCHAR(500) NOT NULL,
    "back_image_url" VARCHAR(500),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "id" BIGSERIAL NOT NULL,
    "tag_name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_tags" (
    "id" BIGSERIAL NOT NULL,
    "card_id" BIGINT NOT NULL,
    "tag_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_tags_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite_cards" (
    "id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "card_id" BIGINT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_login_id_key" ON "users"("login_id");

-- CreateIndex
CREATE INDEX "idx_users_deleted_at" ON "users"("deleted_at");

-- CreateIndex
CREATE INDEX "idx_stores_store_name" ON "stores"("store_name");

-- CreateIndex
CREATE INDEX "idx_stores_deleted_at" ON "stores"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "uq_stores_store_name_prefecture_area" ON "stores"("store_name", "prefecture", "area");

-- CreateIndex
CREATE INDEX "idx_cards_name" ON "cards"("name");

-- CreateIndex
CREATE INDEX "idx_cards_store_id" ON "cards"("store_id");

-- CreateIndex
CREATE INDEX "idx_cards_used_by_user_id" ON "cards"("used_by_user_id");

-- CreateIndex
CREATE INDEX "idx_cards_used_at" ON "cards"("used_at");

-- CreateIndex
CREATE INDEX "idx_cards_deleted_at" ON "cards"("deleted_at");

-- CreateIndex
CREATE UNIQUE INDEX "tags_tag_name_key" ON "tags"("tag_name");

-- CreateIndex
CREATE INDEX "idx_tags_deleted_at" ON "tags"("deleted_at");

-- CreateIndex
CREATE INDEX "idx_card_tags_tag_id" ON "card_tags"("tag_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_card_tags_card_id_tag_id" ON "card_tags"("card_id", "tag_id");

-- CreateIndex
CREATE INDEX "idx_favorite_cards_card_id" ON "favorite_cards"("card_id");

-- CreateIndex
CREATE UNIQUE INDEX "uq_favorite_cards_user_id_card_id" ON "favorite_cards"("user_id", "card_id");

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cards" ADD CONSTRAINT "cards_used_by_user_id_fkey" FOREIGN KEY ("used_by_user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_tags" ADD CONSTRAINT "card_tags_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_tags" ADD CONSTRAINT "card_tags_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_cards" ADD CONSTRAINT "favorite_cards_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite_cards" ADD CONSTRAINT "favorite_cards_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
