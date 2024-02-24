import {
  GraphQLEmailAddress,
  GraphQLLatitude,
  GraphQLLongitude,
} from 'graphql-scalars';
import { User, UserCreateInput } from './user.entity';

import { CreateUserInput } from '../user/graphql/user.schema';
import { ObjectId } from 'bson';

describe('UserEntity', () => {
  //   let input: CreateUserInput;
  //   let userCreatedInput: UserCreateInput;
  //   let user: User;

  beforeEach(() => {});

  test('should create a new User with minimum required fields and valid input values', () => {
    const input: CreateUserInput = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com' as unknown as typeof GraphQLEmailAddress,
      username: 'johndoe',
      picks: ['pick1', 'pick2'],
      device: 'device-id',
      picture: 'profile.jpg',
      latitude: 89.456 as unknown as typeof GraphQLLatitude,
      longitude: 57.012 as unknown as typeof GraphQLLongitude,
    };

    const expectedUser: UserCreateInput = {
      name: {
        firstName: 'John',
        lastName: 'Doe',
      },
      email: 'john.doe@example.com',
      username: 'johndoe',
      picture: 'profile.jpg',
      picks: ['pick1', 'pick2'],
      devices: ['device-id'],
      latitude: 89.456,
      longitude: 57.012,
    };

    const result = User.ToEntityFromInput(input);

    expect(result).toEqual(expectedUser);
  });

  it('should create a new User from Prisma result', () => {
    const result = {
      id: '65d9a85d64190930a909d6ba',
      email: 'john.doe@example.com',
      username: 'johndoe',
      name: {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
      },
      picture: 'profile.jpg',
      picks: ['pick1', 'pick2'],
      devices: ['device-id'],
      pings: [{ __typename: 'Ping', id: 'ping1' }],
      activityCount: 1,
    };

    const expectedUser: User = {
      id: '65d9a85d64190930a909d6ba',
      createdAt: new ObjectId('65d9a85d64190930a909d6ba').getTimestamp(),
      email: 'john.doe@example.com',
      username: 'johndoe',
      name: {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
      },
      picture: 'profile.jpg',
      picks: ['pick1', 'pick2'],
      devices: ['device-id'],
      pings: [{ __typename: 'Ping', id: 'ping1' }],
      activityCount: 1,
    };
    const user = User.ToEntityFromPrisma(result);

    expect(user).toEqual(expectedUser);
  });
});
