/*
  Warnings:

  - You are about to drop the `_CategoryToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `_CategoryToProduct`;

-- CreateIndex
CREATE INDEX `products_categoryId_idx` ON `products`(`categoryId`);
