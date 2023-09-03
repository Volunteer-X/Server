import { Inject } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from './prisma.service';

const prismaRepositories = new Set<PrismaDelegateNames>();

export function createRepositoryProviders() {
  return [...prismaRepositories].map((name) => {
    return {
      provide: `${String(name)}PrismaRepository`,
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => prisma[name],
    };
  });
}

/**
 * Example:
 * @InjectRepository('user') repository: PrismaRepository['user'] or PrismaClient['user']
 */
export function InjectRepository(name: PrismaDelegateNames) {
  prismaRepositories.add(name);
  return Inject(`${name as string}PrismaRepository`);
}

export type PrismaDelegateNames = keyof {
  [P in keyof PrismaClient as PrismaClient[P] extends any
    ? P
    : never]: PrismaClient[P];
};
