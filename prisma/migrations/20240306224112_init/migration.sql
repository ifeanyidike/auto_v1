-- CreateTable
CREATE TABLE "Merchant" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "phoneNo" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "MerchantService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "imgUrl" TEXT,
    "imageId" TEXT,
    "description" TEXT,
    "isDraft" BOOLEAN NOT NULL DEFAULT false,
    "allowOutsideWork" BOOLEAN NOT NULL DEFAULT false,
    "pricingMode" TEXT NOT NULL DEFAULT 'FIXED',
    "serviceId" TEXT,
    "merchantId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "MerchantService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "MerchantService_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServicePricing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "merchantServiceId" TEXT,
    "mode" TEXT NOT NULL,
    "type" TEXT,
    "amount" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ServicePricing_merchantServiceId_fkey" FOREIGN KEY ("merchantServiceId") REFERENCES "MerchantService" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Discount" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "merchantServiceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Discount_merchantServiceId_fkey" FOREIGN KEY ("merchantServiceId") REFERENCES "MerchantService" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "interval" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "autoBrand" TEXT NOT NULL DEFAULT 'NONE',
    "merchantServiceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SubscriptionPlan_merchantServiceId_fkey" FOREIGN KEY ("merchantServiceId") REFERENCES "MerchantService" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "type" TEXT NOT NULL DEFAULT 'REPAIR',
    "title" TEXT NOT NULL,
    "description" TEXT,
    "imgUrl" TEXT,
    "imageId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "serviceId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FAQ_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ServiceKeyPoint" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "point" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "merchantServiceId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "planId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Subscription_merchantServiceId_fkey" FOREIGN KEY ("merchantServiceId") REFERENCES "MerchantService" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_planId_fkey" FOREIGN KEY ("planId") REFERENCES "SubscriptionPlan" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "merchantServiceId" TEXT NOT NULL,
    "merchantId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DECIMAL NOT NULL,
    "isOutsideWork" BOOLEAN NOT NULL,
    "location" TEXT,
    "info" TEXT,
    "paymentMode" TEXT NOT NULL DEFAULT 'online',
    "isPaid" BOOLEAN NOT NULL DEFAULT false,
    "isFulfilled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Booking_merchantServiceId_fkey" FOREIGN KEY ("merchantServiceId") REFERENCES "MerchantService" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchant" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNo" TEXT,
    "email" TEXT NOT NULL,
    "imgUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "PaymentAuthorization" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "authorization_code" TEXT NOT NULL,
    "bin" TEXT,
    "last4" TEXT,
    "exp_month" TEXT,
    "exp_year" TEXT,
    "card_type" TEXT,
    "channel" TEXT,
    "bank" TEXT,
    "reusable" BOOLEAN NOT NULL,
    "brand" TEXT,
    "signature" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PaymentAuthorization_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_MerchantServiceToServiceKeyPoint" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_MerchantServiceToServiceKeyPoint_A_fkey" FOREIGN KEY ("A") REFERENCES "MerchantService" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MerchantServiceToServiceKeyPoint_B_fkey" FOREIGN KEY ("B") REFERENCES "ServiceKeyPoint" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FAQToMerchantService" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FAQToMerchantService_A_fkey" FOREIGN KEY ("A") REFERENCES "FAQ" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FAQToMerchantService_B_fkey" FOREIGN KEY ("B") REFERENCES "MerchantService" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_BookingToServicePricing" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_BookingToServicePricing_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_BookingToServicePricing_B_fkey" FOREIGN KEY ("B") REFERENCES "ServicePricing" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE INDEX "Merchant_id_slug_idx" ON "Merchant"("id", "slug");

-- CreateIndex
CREATE INDEX "MerchantService_id_serviceId_merchantId_idx" ON "MerchantService"("id", "serviceId", "merchantId");

-- CreateIndex
CREATE UNIQUE INDEX "Service_title_key" ON "Service"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_userId_merchantServiceId_key" ON "Subscription"("userId", "merchantServiceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentAuthorization_userId_key" ON "PaymentAuthorization"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_MerchantServiceToServiceKeyPoint_AB_unique" ON "_MerchantServiceToServiceKeyPoint"("A", "B");

-- CreateIndex
CREATE INDEX "_MerchantServiceToServiceKeyPoint_B_index" ON "_MerchantServiceToServiceKeyPoint"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FAQToMerchantService_AB_unique" ON "_FAQToMerchantService"("A", "B");

-- CreateIndex
CREATE INDEX "_FAQToMerchantService_B_index" ON "_FAQToMerchantService"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_BookingToServicePricing_AB_unique" ON "_BookingToServicePricing"("A", "B");

-- CreateIndex
CREATE INDEX "_BookingToServicePricing_B_index" ON "_BookingToServicePricing"("B");
