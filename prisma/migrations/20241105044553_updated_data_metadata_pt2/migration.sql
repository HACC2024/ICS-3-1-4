/*
  Warnings:

  - Added the required column `description` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org` to the `Dataset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orgIcon` to the `Dataset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "org" TEXT NOT NULL,
ADD COLUMN     "orgIcon" TEXT NOT NULL;
