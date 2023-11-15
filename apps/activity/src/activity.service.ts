import { IPing } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { ActivityRepository } from './db/prisma.service';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);
  private readonly repository: ActivityRepository;

  async createActivity(ping: IPing) {
    this.logger.log('createActivity', ping);
    const activity = await this.repository.activity.create({
      data: {
        pingID: ping.id,
        userID: ping.userID,
        name: ping.title,
        description: ping.description,
        url: ping.url,
        createdAt: ping.createdAt,
        geometry: {
          coordinates: ping.geometry.coordinates,
          type: 'Point',
        },
      },
    });
  }
}