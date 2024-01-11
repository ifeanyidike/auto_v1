-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MerchantService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgUrl" TEXT,
    "serviceId" TEXT,
    "merchantId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MerchantService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MerchantService_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MerchantService" ("createdAt", "id", "imgUrl", "merchantId", "serviceId", "updatedAt") SELECT "createdAt", "id", "imgUrl", "merchantId", "serviceId", "updatedAt" FROM "MerchantService";
DROP TABLE "MerchantService";
ALTER TABLE "new_MerchantService" RENAME TO "MerchantService";
CREATE INDEX "MerchantService_id_serviceId_merchantId_idx" ON "MerchantService"("id", "serviceId", "merchantId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
