-- CreateEnum
CREATE TYPE "Roles" AS ENUM ('ADMIN');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "roles" "Roles"[];
