import { ObjectId } from 'bson';
import { User } from '../../../entity/user.entity';

export const userStub = (): User => {
  return new User(
    {
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Smith',
    },
    'test@example.com',
    'testuser',
    ['pick1', 'pick2'],
    ['device1'],
    'profile.jpg',
    [
      {
        __typename: 'Ping',
        id: 'ping1',
      },
    ],
    '65d9a85d64190930a909d6ba',
    new ObjectId('65d9a85d64190930a909d6ba').getTimestamp(),
    1,
  );
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
