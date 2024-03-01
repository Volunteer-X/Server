import { Prisma } from '@prisma/forum';

export class Message {
  id: string;
  userId: string;
  channelId: string;
  text: string;

  static ToEntityFromPrisma(message: Prisma.MessageGetPayload<true>): Message {
    const { id, userId, channelId, text } = message;

    return {
      id,
      userId,
      channelId,
      text,
    };
  }
}
