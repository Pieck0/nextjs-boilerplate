/*
  Warnings:

  - Made the column `status` on table `order` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "order" ALTER COLUMN "deletedAt" DROP NOT NULL,
ALTER COLUMN "status" SET NOT NULL;
