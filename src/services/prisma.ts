// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;

export const getPrisma = (databaseUrl: string) => {
  if (!prisma) {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }
  return prisma;
};
