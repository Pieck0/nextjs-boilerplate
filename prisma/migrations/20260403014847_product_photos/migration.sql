-- CreateTable
CREATE TABLE "product_photo" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "product_photo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "product_photo" ADD CONSTRAINT "product_photo_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
