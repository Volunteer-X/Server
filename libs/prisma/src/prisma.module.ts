import { DynamicModule, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import {
  PRIMSA_OPTIONS,
  PrismaModuleAsyncOptions,
  PrismaModuleOptions,
  createAsyncProvider,
  defaultPrismaOptions,
} from './prisma.provider';
import { createRepositoryProviders } from './inject-repository.decorator';

@Module({})
export class PrismaModule {
  static register(options: PrismaModuleOptions): DynamicModule {
    const repositoryProviders = createRepositoryProviders();

    options = { ...defaultPrismaOptions, ...options };
    return {
      global: true,
      module: PrismaModule,
      providers: [
        {
          provide: PRIMSA_OPTIONS,
          useValue: options,
        },
        PrismaService,
        ...repositoryProviders,
      ],
      exports: [...repositoryProviders, PrismaService],
    };
  }

  static registerAsync(options: PrismaModuleAsyncOptions): DynamicModule {
    const repositoryProviders = createRepositoryProviders();
    return {
      global: true,
      module: PrismaModule,
      imports: options.imports || [],
      providers: [
        ...createAsyncProvider(options),
        ...repositoryProviders,
        PrismaService,
      ],
      exports: [...repositoryProviders, PrismaService],
    };
  }
}
