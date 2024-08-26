-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "InstructorId" INTEGER;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_InstructorId_fkey" FOREIGN KEY ("InstructorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
