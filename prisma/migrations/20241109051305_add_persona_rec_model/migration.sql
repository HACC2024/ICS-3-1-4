-- CreateTable
CREATE TABLE "PersonaRecommendation" (
    "persona" TEXT NOT NULL,
    "recommendations" TEXT[],
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PersonaRecommendation_pkey" PRIMARY KEY ("persona")
);
