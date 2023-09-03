import { ModuleMetadata, Provider, Type } from '@nestjs/common';

export const PRIMSA_OPTIONS = Symbol('PRIMSA_OPTIONS');

export const defaultPrismaOptions = {
  logQueries: false,
};

export type PrismaModuleOptions = typeof defaultPrismaOptions;

export interface PrismaOptionsFactory {
  createPrismaOptions(): Partial<PrismaModuleOptions>;
}

export interface PrismaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<PrismaOptionsFactory>;
  useExisting?: Type<PrismaModuleOptions>;
  useFactory?: (
    ...args: any[]
  ) => Promise<Partial<PrismaModuleOptions>> | Partial<PrismaModuleOptions>;
  inject?: any[];
}

export function createAsyncProvider(
  options: PrismaModuleAsyncOptions,
): Provider[] {
  if (options.useFactory || options.useExisting)
    return [createAsyncOptionsProvider(options)];
  const useClass = options.useClass as Type<PrismaOptionsFactory>;
  return [createAsyncOptionsProvider(options), { provide: useClass, useClass }];
}

export function createAsyncOptionsProvider(
  options: PrismaModuleAsyncOptions,
): Provider {
  if (options.useFactory) {
    return {
      provide: PRIMSA_OPTIONS,
      useFactory: async (...args: any[]) => {
        return {
          ...defaultPrismaOptions,
          ...(options.useFactory && (await options.useFactory(...args))),
        };
      },
      inject: options.inject || [],
    };
  }
  return {
    provide: PRIMSA_OPTIONS,
    useFactory: (factory: PrismaOptionsFactory) =>
      factory.createPrismaOptions(),
    inject: [
      (options.useClass || options.useExisting) as Type<PrismaOptionsFactory>,
    ],
  };
}
