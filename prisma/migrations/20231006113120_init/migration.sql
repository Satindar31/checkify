-- CreateTable
CREATE TABLE "website" (
    "id" STRING NOT NULL,
    "userId" STRING NOT NULL,
    "name" STRING NOT NULL,
    "url" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "up" BOOL NOT NULL DEFAULT true,
    "status" STRING NOT NULL DEFAULT 'pending',
    "response" INT4,

    CONSTRAINT "website_pkey" PRIMARY KEY ("id")
);
