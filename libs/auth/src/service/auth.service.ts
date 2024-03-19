import { InjectRepository, PrismaService } from '@app/prisma';
import { Injectable, Logger } from '@nestjs/common';
import { AuthEntity } from '@app/auth/entity/auth.entity';
import { NotFoundError } from '@app/common';

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
  async findUser(email: string): Promise<AuthEntity | NotFoundError> {
    try {
      const result = await this.userRepo.findUniqueOrThrow({
        where: { email: email },
      });

      return AuthEntity.ToEntityFromPrisma(result);
    } catch (error) {
      this.logger.error(`Error finding user by ${email}\n ${error}`);
      return new NotFoundError(
        'No user under this authentication, user needs to login to volunteerx',
      );
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
