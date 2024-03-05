import { Message } from '../../message/entity/message.entity';
import { ObjectId } from 'bson';
import { Prisma } from '@prisma/forum';

type ChannelPayload = Prisma.ChannelGetPayload<{
  select: {
    id: true;
    title: true;
    admin: true;
    activityId: true;
    messages: true;
  };
}>;
// & {
//   messages?: Prisma.MessageGetPayload<true>[];
// };

export class Channel {
  id: string;
  title: string;
  admin: string;
  activityId: string;
  createdAt: Date;
  ping: { __typename: 'Ping'; id: string };
  participants?: { __typename: 'User'; id: string }[];
  messages?: Message[];

  static ToEntityFromPrisma(channel: any): Channel {
    const { id, title, admin, activityId, messages, participants } = channel;

    return {
      id,
      title,
      admin,
      activityId,
      createdAt: new ObjectId(id as string).getTimestamp(),
      ping: { __typename: 'Ping', id: activityId },
      participants:
        participants &&
        participants.map((participant: string) => ({
          __typename: 'User',
          id: participant,
        })),
      messages: messages && messages.map(Message.ToEntityFromPrisma),
    };
  }

  static ToEntityFromPrismaArray(channels: any): Channel[] {
    return channels.map(Channel.ToEntityFromPrisma);
  }
}
