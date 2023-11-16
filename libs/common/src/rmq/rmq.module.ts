import { DynamicModule, Module } from '@nestjs/common';
import { RMQService } from './rmq.service';
import {
  ClientsModule,
  ClientsModuleAsyncOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

interface RmqModuleOptions {
  name: string[];
}

@Module({
  providers: [RMQService],
  exports: [RMQService],
})
export class RmqModule {
  static register({ name }: RmqModuleOptions): DynamicModule {
    function getImports(name: string[]): ClientsModuleAsyncOptions {
      return name.map((queue) => ({
        name: queue,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
          },
        }),
        inject: [ConfigService],
      }));
    }

    return {
      module: RmqModule,
      imports: [ClientsModule.registerAsync(getImports(name))],
      exports: [ClientsModule],
    };
  }
}
