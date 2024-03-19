import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { DynamicModule, Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { RMQService } from './rmq.service';

interface RmqModuleOptions {
  name: string[];
}

@Module({
  providers: [RMQService],
  exports: [RMQService],
})
export class RmqModule {
  private static getImports(name: string[]): ClientsModuleAsyncOptions {
    return name.map((queue) => ({
      name: queue,
      useFactory: (configService: ConfigService) => ({
        transport: Transport.RMQ,
        options: {
          urls: [configService.get<string>('RABBITMQ_URI')],
          queue: configService.get<string>(`RABBITMQ_${queue}_QUEUE`),
        },
      }),
      inject: [ConfigService],
    }));
  }

  static register({ name }: RmqModuleOptions): DynamicModule {
    return {
      module: RmqModule,
      imports: [ClientsModule.registerAsync(this.getImports(name))],
      exports: [ClientsModule],
    };
  }
}
