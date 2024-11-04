/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PersonaQuizResponse` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PersonaQuizResponse" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PersonaQuizResponse_email_key" ON "PersonaQuizResponse"("email");
