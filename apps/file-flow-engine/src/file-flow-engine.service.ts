import { Injectable } from '@nestjs/common';

@Injectable()
export class FileFlowEngineService {
  getHello(): string {
    return 'Hello World!';
  }
}
