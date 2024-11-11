/*
  Warnings:

  - The primary key for the `PersonaRecommendation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `recommendations` on the `PersonaRecommendation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[persona,datasetId]` on the table `PersonaRecommendation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `datasetId` to the `PersonaRecommendation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Dataset" ALTER COLUMN "ownerId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "PersonaRecommendation" DROP CONSTRAINT "PersonaRecommendation_pkey",
DROP COLUMN "recommendations",
ADD COLUMN     "datasetId" INTEGER NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "PersonaRecommendation_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PersonaRecommendation_persona_datasetId_key" ON "PersonaRecommendation"("persona", "datasetId");

-- AddForeignKey
ALTER TABLE "PersonaRecommendation" ADD CONSTRAINT "PersonaRecommendation_datasetId_fkey" FOREIGN KEY ("datasetId") REFERENCES "Dataset"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
