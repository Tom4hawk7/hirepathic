import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";


const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
export const prisma = new PrismaClient({ adapter });


// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }