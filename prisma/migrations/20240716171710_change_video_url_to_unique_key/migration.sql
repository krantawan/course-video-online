/*
  Warnings:

  - A unique constraint covering the columns `[videoUrl]` on the table `CourseSession` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "CourseSession_videoUrl_key" ON "CourseSession"("videoUrl");
