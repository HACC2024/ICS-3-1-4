-- DropForeignKey
ALTER TABLE "PersonaRecommendation" DROP CONSTRAINT "PersonaRecommendation_datasetId_fkey";

-- AddForeignKey
ALTER TABLE "PersonaRecommendation" ADD CONSTRAINT "PersonaRecommendation_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE;
