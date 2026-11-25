CREATE TYPE "ProjectStatus" AS ENUM ('PLANNED', 'ACTIVE', 'ON_HOLD', 'COMPLETED');
CREATE TABLE "Project" (
  "id" TEXT NOT NULL,
  "code" VARCHAR(24) NOT NULL,
  "name" VARCHAR(120) NOT NULL,
  "customerName" VARCHAR(120) NOT NULL,
  "description" VARCHAR(4000) NOT NULL DEFAULT '',
  "status" "ProjectStatus" NOT NULL DEFAULT 'PLANNED',
  "siteName" VARCHAR(120) NOT NULL,
  "siteAddress" VARCHAR(240) NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Project_code_key" ON "Project"("code");
CREATE INDEX "Project_createdAt_idx" ON "Project"("createdAt");
