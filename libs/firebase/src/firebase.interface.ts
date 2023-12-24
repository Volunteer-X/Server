import { ModuleMetadata, Type } from '@nestjs/common';
import * as Firebase from 'firebase-admin';

export type FirebaseModuleOptions = {
  googleApplicationCredential: string | Firebase.ServiceAccount;
} & Omit<Firebase.AppOptions, 'credential'>;

export interface FirebaseModuleOptionsFactory {
  createFirebaseModuleOptions():
    | Promise<FirebaseModuleOptions>
    | FirebaseModuleOptions;
}

export type FirebaseModuleAsyncOptions = {
  useClass?: Type<FirebaseModuleOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions;
  inject?: any[];
  useExisting?: Type<FirebaseModuleOptionsFactory>;
} & Pick<ModuleMetadata, 'imports'>;

export interface FirebaseAdmin {
  auth: Firebase.auth.Auth;
  messaging: Firebase.messaging.Messaging;
}
