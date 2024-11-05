-- CreateTable
CREATE TABLE "PersonaQuizResponse" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "goal" TEXT NOT NULL,
    "usage" TEXT NOT NULL,
    "comfortLevel" TEXT NOT NULL,
    "dataType" TEXT NOT NULL,
    "interaction" TEXT NOT NULL,
    "assignedPersona" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PersonaQuizResponse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PersonaQuizResponse_email_key" ON "PersonaQuizResponse"("email");
