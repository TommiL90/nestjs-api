/*
  Warnings:

  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `products_orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `products_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `addresses` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `totalPrice` DOUBLE NOT NULL,
    ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `pets` ALTER COLUMN `createdAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `products_orders` ADD COLUMN `price` DOUBLE NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `users` ALTER COLUMN `createdAt` DROP DEFAULT;
