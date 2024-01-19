/*
  Warnings:

  - A unique constraint covering the columns `[serviceId]` on the table `MerchantService` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MerchantService" ADD COLUMN "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MerchantService_serviceId_key" ON "MerchantService"("serviceId");
