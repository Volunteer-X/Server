import { mockDeep, mockReset } from 'jest-mock-extended';

import { PrismaClient } from '@prisma/client';

jest.mock('./prisma.service', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(prismaMock);
});

export const prismaMock = mockDeep<PrismaClient>();
