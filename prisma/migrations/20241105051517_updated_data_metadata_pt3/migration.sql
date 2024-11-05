/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Dataset` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Dataset_name_key" ON "Dataset"("name");
