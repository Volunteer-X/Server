import { Channel } from '../entity/channel';

export const channelStub = (): Channel => {
  return {
    id: '61e4a1f5a6f2b941d59f8c8a',
    title: 'Test',
    admin: '5f7d4138e8017e001fd15e6a',
    activityId: '58a1d20c201f52270b89b2c9',
    createdAt: new Date('2022-01-16T22:53:41.000Z'),
    ping: { __typename: 'Forum', id: '58a1d20c201f52270b89b2c9' },
    participants: [{ __typename: 'User', id: '507f1f77bcf86cd799439011' }],
  };
};
