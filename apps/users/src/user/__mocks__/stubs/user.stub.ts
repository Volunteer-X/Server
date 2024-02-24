import { ObjectId } from 'bson';
import { User } from '../../../entity/user.entity';

export const userStub = (): User => {
  return {
    name: {
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Smith',
    },
    email: 'test@example.com',
    username: 'testuser',
    picture: 'profile.jpg',
    picks: ['pick1', 'pick2'],
    devices: ['device1'],
    pings: [
      {
        __typename: 'Ping',
        id: 'ping1',
      },
    ],
    id: '65d9a85d64190930a909d6ba',
    activityCount: 1,
    createdAt: new ObjectId('65d9a85d64190930a909d6ba').getTimestamp(),
  };
};
