import { Query, Resolver } from '@nestjs/graphql';

@Resolver('message')
export class MessageResolver {
  @Query('getHello')
  getHello() {
    return 'Hello World!';
  }
}
