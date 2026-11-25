import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForDb = globalThis as unknown as { db: PrismaClient | undefined };

export function getDb() {
  if (!globalForDb.db) {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) throw new Error("DATABASE_URL is not configured.");
    globalForDb.db = new PrismaClient({
      adapter: new PrismaPg({ connectionString, connectionTimeoutMillis: 5000 }),
    });
  }
  return globalForDb.db;
}
