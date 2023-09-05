/*
  Warnings:

  - Added the required column `description` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ADD COLUMN `description` VARCHAR(120) NOT NULL,
    ALTER COLUMN `status` DROP DEFAULT;
