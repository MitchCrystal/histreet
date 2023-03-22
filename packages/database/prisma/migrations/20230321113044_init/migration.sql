-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "user_first_name" TEXT NOT NULL,
    "user_last_name" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Store" (
    "store_id" TEXT NOT NULL,
    "store_owner_id" TEXT NOT NULL,
    "store_owner" TEXT NOT NULL,
    "store_name" TEXT NOT NULL,
    "store_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("store_id")
);

-- CreateTable
CREATE TABLE "Order" (
    "order_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "friendly_order_number" SERIAL NOT NULL,
    "bill_address_id" TEXT NOT NULL,
    "ship_address_id" TEXT NOT NULL,
    "order_details" TEXT[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_order_cost" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "SKU" TEXT NOT NULL,
    "product_name" TEXT NOT NULL,
    "barcode" INTEGER,
    "inventory_qty" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT,
    "product_price" INTEGER NOT NULL,
    "Categories" TEXT,
    "deparmtent" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "product_name_slug" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "customer_id" TEXT NOT NULL,
    "customer_first_name" TEXT NOT NULL,
    "customer_last_name" TEXT NOT NULL,
    "customer_email" TEXT NOT NULL,
    "phone_number" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "Customer_account" (
    "customer_account_id" TEXT NOT NULL,
    "customer_account_password_hash" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,

    CONSTRAINT "Customer_account_pkey" PRIMARY KEY ("customer_account_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address_id" TEXT NOT NULL,
    "address_first_name" TEXT NOT NULL,
    "address_last_name" TEXT NOT NULL,
    "address_line_1" TEXT NOT NULL,
    "address_line_2" TEXT NOT NULL,
    "county" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "postcode" TEXT NOT NULL,
    "customer_id" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address_id")
);

-- CreateTable
CREATE TABLE "Images" (
    "image_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "image_alt" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "Storefront" (
    "storefront_id" TEXT NOT NULL,
    "global_styles" TEXT NOT NULL,
    "blocks" TEXT NOT NULL,
    "store_id" TEXT NOT NULL,
    "support_email" TEXT NOT NULL,
    "store_logo_id" TEXT NOT NULL,
    "store_hero_image_id" TEXT NOT NULL,
    "store_description" TEXT NOT NULL,

    CONSTRAINT "Storefront_pkey" PRIMARY KEY ("storefront_id")
);

-- CreateTable
CREATE TABLE "_OrderToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_url_key" ON "Store"("store_url");

-- CreateIndex
CREATE UNIQUE INDEX "Order_order_id_key" ON "Order"("order_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_bill_address_id_key" ON "Order"("bill_address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Order_ship_address_id_key" ON "Order"("ship_address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customer_id_key" ON "Customer"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_account_customer_account_id_key" ON "Customer_account"("customer_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_account_customer_id_key" ON "Customer_account"("customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_address_id_key" ON "Address"("address_id");

-- CreateIndex
CREATE UNIQUE INDEX "Images_image_id_key" ON "Images"("image_id");

-- CreateIndex
CREATE UNIQUE INDEX "Storefront_storefront_id_key" ON "Storefront"("storefront_id");

-- CreateIndex
CREATE UNIQUE INDEX "Storefront_store_id_key" ON "Storefront"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Storefront_store_logo_id_key" ON "Storefront"("store_logo_id");

-- CreateIndex
CREATE UNIQUE INDEX "Storefront_store_hero_image_id_key" ON "Storefront"("store_hero_image_id");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToProduct_AB_unique" ON "_OrderToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToProduct_B_index" ON "_OrderToProduct"("B");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_store_owner_id_fkey" FOREIGN KEY ("store_owner_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_bill_address_id_fkey" FOREIGN KEY ("bill_address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_ship_address_id_fkey" FOREIGN KEY ("ship_address_id") REFERENCES "Address"("address_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_account" ADD CONSTRAINT "Customer_account_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storefront" ADD CONSTRAINT "Storefront_store_logo_id_fkey" FOREIGN KEY ("store_logo_id") REFERENCES "Images"("image_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storefront" ADD CONSTRAINT "Storefront_store_hero_image_id_fkey" FOREIGN KEY ("store_hero_image_id") REFERENCES "Images"("image_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Storefront" ADD CONSTRAINT "Storefront_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToProduct" ADD CONSTRAINT "_OrderToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
