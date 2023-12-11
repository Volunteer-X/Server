import { InjectRepository, PrismaService } from '@app/prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository('user')
    private readonly userRepo: PrismaService['user'],
  ) {}

  /*
  ? Get user details by email
  */
  async findUser(email: string) {
    const user = await this.userRepo.findUnique({
      where: { email: email },
    });

    console.log('user', user);

    return user;
  }
}
