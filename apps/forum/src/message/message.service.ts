import { Injectable } from '@nestjs/common';
import { CreateMessage } from 'apps/forum/src/common/dto/message.dto';
import { ForumRepository } from 'apps/forum/src/service/forum.service';

@Injectable()
export class MessageService {
  constructor(private readonly forumRepository: ForumRepository) {}

  async getMessages(channelID: string, limit: number, cursor: string) {
    try {
      const messages = await this.forumRepository.message.findMany({
        where: { channelID },
        take: limit,
        cursor: { id: cursor },
        orderBy: { id: 'asc' },
      });

      return messages;
    } catch (error) {
      console.log(error);

      return { success: false, message: 'Messages were not found' };
    }
  }

  async addMessage(message: CreateMessage) {
    try {
      await this.forumRepository.message.create({
        data: {
          userID: message.userID,
          channelID: message.channelID,
          text: message.text,
        },
      });

      return { success: true, message: 'Message added' };
    } catch (error) {
      console.log(error);

      return { success: false, message: 'Message was not added' };
    }
  }

  async deleteMessage(id: string) {
    try {
      await this.forumRepository.message.delete({ where: { id } });

      return { success: true, message: 'Message deleted' };
    } catch (error) {
      console.log(error);

      return { success: false, message: 'Message was not deleted' };
    }
  }
}
