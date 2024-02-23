import { InjectRepository, PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';
import { AuthEntity } from '@app/auth/entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaService['user'],
  ) {}

  /*
  ? Get user details by email
  */
  async findUser(email: string): Promise<AuthEntity> {
    const result = await this.userRepo.findUnique({
      where: { email: email },
    });

    return AuthEntity.ToEntityFromPrisma(result);

    // return {
    //   id: result.id,
    //   createdAt: new ObjectId(result.id).getTimestamp(),
    //   name: {
    //     firstName: result.name.firstName,
    //     middleName: result.name.middleName,
    //     lastName: result.name.lastName,
    //   },
    //   email: result.email,
    //   username: result.username,
    //   picture: result.picture,
    //   picks: result.picks,
    //   activityCount: result.pings.length,
    //   devices: result.devices,
    // };
  }
}
