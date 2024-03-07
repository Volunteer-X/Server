import { InjectRepository, PrismaService } from '@app/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { AuthEntity } from '@app/auth/entity/auth.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaService['user'],
  ) {}

  /*
  ? Get user details by email
  */
  async findUser(email: string): Promise<AuthEntity | undefined> {
    try {
      const result = await this.userRepo.findUnique({
        where: { email: email },
      });

      return AuthEntity.ToEntityFromPrisma(result);
    } catch (error) {
      this.logger.error(`Error finding user by email: ${email}`, error);
      return undefined;
    }

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
