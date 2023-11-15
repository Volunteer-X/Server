import { Inject, Injectable } from '@nestjs/common';
import { CreatePingInput, Ping } from './graphql/ping.schema';
import { PingRepository } from '../prisma/prisma.service';
import { ACTIVITY_SERVICE } from '../constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { IPing } from '@app/common';

@Injectable()
export class PingService {
  constructor(
    private readonly repository: PingRepository,
    @Inject(ACTIVITY_SERVICE) private activityClient: ClientProxy,
  ) {}

  /* 
  ? Create new Ping
  * @param {CreatePingInput} input
  * @returns {Ping}
  */
  async createPing(input: CreatePingInput) {
    const { title, description, userID, url, picks, latitude, longitude } =
      input;

    // console.log('input', input);

    const result = await this.repository.$transaction([
      this.repository.ping.create({
        data: {
          title,
          description,
          picks,
          userID: userID.toString(),
          geometry: {
            type: 'Point',
            coordinates: [
              parseFloat(latitude.toString()),
              parseFloat(longitude.toString()),
            ],
          },
        },
      }),
    ]);

    await lastValueFrom(
      this.activityClient.emit<string, string>(
        'pingCreated',
        JSON.stringify(result[0]),
      ),
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { geometry, radius, ...ping } = result[0];

    return {
      ...ping,
      latitude: geometry.coordinates[0],
      longitude: geometry.coordinates[1],
    };
  }
}
