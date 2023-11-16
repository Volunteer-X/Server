import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RmqConfigService {
  constructor(private configService: ConfigService) {}

  getUri() {
    return this.configService.get<string>('RABBIT_MQ_URI');
  }

  getQueues(name: string[]) {
    return name.map((queue) =>
      this.configService.get<string>(`RABBIT_MQ_${queue}_QUEUE`),
    );
  }
}
