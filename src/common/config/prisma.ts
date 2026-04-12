import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import Config from "@/common/config/config";
import { PrismaClient } from "@/prisma_local/generated/prisma/client";

const connectionString = `${Config.DATABASE.url}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };