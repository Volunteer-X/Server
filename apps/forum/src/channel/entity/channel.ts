import { ObjectId } from 'bson';
import { Prisma } from '@prisma/forum';

export class Channel {
  id: string;
  title: string;
  admin: string;
  activityId: string;
  createdAt: Date;
  ping: { __typename: 'Forum'; id: string };
  participants: { __typename: 'User'; id: string }[];

  static ToEntityFromPrisma(channel: Prisma.ChannelGetPayload<true>): Channel {
    return {
      id: channel.id,
      title: channel.title,
      admin: channel.admin,
      activityId: channel.activityId,
      createdAt: new ObjectId(channel.id as string).getTimestamp(),
      ping: { __typename: 'Forum', id: channel.activityId },
      participants:
        channel.participants &&
        channel.participants.map((participant) => ({
          __typename: 'User',
          id: participant,
        })),
    };
  }
}
