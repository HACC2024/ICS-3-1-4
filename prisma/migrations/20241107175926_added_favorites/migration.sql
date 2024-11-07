-- CreateTable
CREATE TABLE "_DatasetToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DatasetToUser_AB_unique" ON "_DatasetToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_DatasetToUser_B_index" ON "_DatasetToUser"("B");

-- AddForeignKey
ALTER TABLE "_DatasetToUser" ADD CONSTRAINT "_DatasetToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Dataset"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DatasetToUser" ADD CONSTRAINT "_DatasetToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
