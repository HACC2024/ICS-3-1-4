/*
  Warnings:

  - You are about to drop the `PersonaQuizResponse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PersonaQuizResponse";

-- CreateTable
CREATE TABLE "PersonaQuiz" (
    "id" SERIAL NOT NULL,
    "goal" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "comfortLevel" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "interaction" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "assignedPersona" TEXT NOT NULL,

    CONSTRAINT "PersonaQuiz_pkey" PRIMARY KEY ("id")
);
