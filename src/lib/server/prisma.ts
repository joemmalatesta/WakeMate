import { PrismaClient } from '@prisma/client';

//New client on first load, use global after
const prisma = global.prisma || new PrismaClient();

//Set global var to new Client
//prod will only ever have one instance..
if (process.env.NODE_ENV === 'development') {
	global.prisma = prisma;
}

export { prisma };
