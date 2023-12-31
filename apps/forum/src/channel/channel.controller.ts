import { Controller, Get } from '@nestjs/common';
import { ForumService } from './channel.service';

@Controller()
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Get()
  getHello(): string {
    return this.forumService.getHello();
  }
}
