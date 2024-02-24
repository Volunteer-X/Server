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
  );
};
