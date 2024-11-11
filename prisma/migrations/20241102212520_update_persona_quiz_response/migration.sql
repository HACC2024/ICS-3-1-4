/*
  Warnings:

  - You are about to drop the column `email` on the `PersonaQuizResponse` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "PersonaQuizResponse_email_key";

-- AlterTable
ALTER TABLE "PersonaQuizResponse" DROP COLUMN "email";
