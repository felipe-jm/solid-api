/*
  Warnings:

  - You are about to drop the column `title` on the `gyms` table. All the data in the column will be lost.
  - Added the required column `name` to the `gyms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "gyms" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL;
