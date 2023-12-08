export * from './inject-repository.decorator';
export * from './prisma.module';
export * from './prisma.provider';
export * from './prisma.service';

export { PrismaClient as PingClient } from '../__generated__/client/ping';
export { PrismaClient as UserClient } from '../__generated__/client/users';
