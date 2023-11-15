import { IPing } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);

  async createActivity(ping: IPing) {
    this.logger.log('createActivity', ping);
  }
}
