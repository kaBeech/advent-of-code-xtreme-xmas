/*
  Warnings:

  - Added the required column `height` to the `TestChair` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TestChair" ADD COLUMN     "height" INTEGER NOT NULL;
