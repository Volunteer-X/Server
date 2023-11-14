import { Injectable } from '@nestjs/common';
import { CreatePingInput, Ping } from './graphql/ping.schema';
import { PingRepository } from '../prisma/prisma.service';

@Injectable()
export class PingService {
  constructor(private readonly pingRepo: PingRepository) {}

  /* 
  ? Create new Ping
  * @param {CreatePingInput} input
  * @returns {Ping}
  */
  async createPing(input: CreatePingInput) {
    const { title, description, userID, url, picks, latitude, longitude } =
      input;

    console.log('input', input);

    const respond = this.pingRepo.ping.create({
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
    });

    const { geometry, radius, ...ping } = await respond;

    return {
      ...ping,
      latitude: geometry.coordinates[0],
      longitude: geometry.coordinates[1],
    };
  }
}
