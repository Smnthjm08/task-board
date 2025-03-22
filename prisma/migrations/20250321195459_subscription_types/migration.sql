-- CreateEnum
CREATE TYPE "Subscription" AS ENUM ('FREE', 'BASIC', 'PREMIUM');

-- AlterTable
ALTER TABLE "organizations" ADD COLUMN     "subscription" "Subscription" NOT NULL DEFAULT 'FREE';
