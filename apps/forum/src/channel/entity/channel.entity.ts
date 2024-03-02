import { Message } from '../../message/entity/message.entity';
import { ObjectId } from 'bson';
import { Prisma } from '@prisma/forum';

type ChannelPayload = Prisma.ChannelGetPayload<true> & {
  messages?: Prisma.MessageGetPayload<true>[];
};

export class Channel {
  id: string;
  title: string;
  admin: string;
  activityId: string;
  createdAt: Date;
  ping: { __typename: 'Forum'; id: string };
  participants?: { __typename: 'User'; id: string }[];
  messages?: Message[];

  static ToEntityFromPrisma(channel: ChannelPayload): Channel {
    const { id, title, admin, activityId, messages, participants } = channel;

    return {
      id,
      title,
      admin,
      activityId,
      createdAt: new ObjectId(id as string).getTimestamp(),
      ping: { __typename: 'Forum', id: activityId },
      participants:
        participants &&
        participants.map((participant) => ({
          __typename: 'User',
          id: participant,
        })),
      messages: messages && messages.map(Message.ToEntityFromPrisma),
    };
  }

  static ToEntityFromPrismaArray(channels: ChannelPayload[]): Channel[] {
    return channels.map(Channel.ToEntityFromPrisma);
  }
}
