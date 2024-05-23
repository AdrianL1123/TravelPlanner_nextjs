-- CreateTable
CREATE TABLE "Trip" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "budget" INTEGER
);

-- CreateIndex
CREATE UNIQUE INDEX "Trip_id_key" ON "Trip"("id");
