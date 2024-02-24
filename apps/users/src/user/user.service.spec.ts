import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import { InternalServerError, NotFoundError } from './graphql/user.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { User, UserCreateInput } from '../entity/user.entity';

import { PrismaClient } from '@prisma/client';
import { UserRepository } from './service/prisma.service';
import { UserService } from './user.service';
import { userStub } from './__mocks__/stubs/user.stub';

describe('UserService', () => {
  let service: UserService;
  let prisma: DeepMockProxy<Pick<UserRepository, 'user'>>;
  let client;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, UserRepository],
    })
      .overrideProvider(UserRepository)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get<UserService>(UserService);
    prisma = module.get(UserRepository);
    client = prisma.user;
    mockReset(prisma);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a user', () => {
    const input: UserCreateInput = {
      name: {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
      },
      email: 'test@example.com',
      username: 'testuser',
      picks: ['pick1', 'pick2'],
      picture: 'profile.jpg',
      latitude: 123.456,
      longitude: 789.012,
      devices: ['device1'],
    };

    let user: User;

    beforeEach(async () => {
      client.create.mockResolvedValue(userStub());
      user = await service.createUser(input);
    });

    it('then it should create a new user', async () => {
      expect(user).toBeDefined();
      expect(user.createdAt).toBeDefined();
      expect(user.id).toBeDefined();
      expect(user.email).toBe(input.email);
      expect(user.username).toBe(input.username);
      expect(user.name).toEqual({
        firstName: input.name.firstName,
        middleName: input.name.middleName,
        lastName: input.name.lastName,
      });
      expect(user.picture).toBe(input.picture);
      expect(user.picks).toEqual(input.picks);
      expect(user.devices).toEqual(input.devices);
    });
  });

  // describe('getUserByEmail', () => {
  //   it('should get user details by email', async () => {
  //     // Test implementation here
  //   });
  // });

  describe('isUsernameAvailable', () => {
    it('should return true if username is available', async () => {
      // Arrange
      const username = 'testuser';
      const count = 0;
      client.count.mockResolvedValue(count);

      // Act
      const result = await service.isUsernameAvailable(username);

      // Assert
      expect(result).toBe(true);
      expect(client.count).toHaveBeenCalledWith({
        where: {
          username: username,
        },
      });
    });

    it('should return false if username is not available', async () => {
      // Arrange
      const username = 'testuser';
      const count = 1;
      client.count.mockResolvedValue(count);

      // Act
      const result = await service.isUsernameAvailable(username);

      // Assert
      expect(result).toBe(false);
      expect(client.count).toHaveBeenCalledWith({
        where: {
          username: username,
        },
      });
    });
  });

  describe('getUserById', () => {
    it('should return the user with the specified ID', async () => {
      // Arrange
      const id = '65d9a85d64190930a909d6ba';

      client.findUniqueOrThrow.mockResolvedValue(userStub());

      // Act
      const result = await service.getUserById(id);

      // Assert
      expect(result).toEqual(userStub());
      expect(client.findUniqueOrThrow).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });

    it('should return a NotFoundError if the user is not found', async () => {
      // Arrange
      const id = '65d9a85d64190930a909d6ba';

      client.findUniqueOrThrow.mockResolvedValue(null);

      // Act
      const result = await service.getUserById(id);

      // Assert
      expect(result).toBeInstanceOf(NotFoundError);
      expect(client.findUniqueOrThrow).toHaveBeenCalledWith({
        where: {
          id,
        },
      });
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      // Arrange
      const payload = {
        id: '65d9a85d64190930a909d6ba',
        email: 'updated@example.com',
        username: 'updateduser',
        name: {
          firstName: 'Updated',
          middleName: 'User',
          lastName: 'Name',
        },
        picks: ['updatedPick1', 'updatedPick2'],
        picture: 'updatedProfile.jpg',
        devices: ['updatedDevice1'],
      };

      const updateData = {
        email: payload.email,
        username: payload.username,
        name: {
          update: {
            firstName: payload.name.firstName,
            lastName: payload.name.lastName,
            middleName: payload.name.middleName,
          },
        },
        picks: payload.picks,
        picture: payload.picture,
        devices: payload.devices,
      };

      const expectedResult = userStub();

      client.update.mockResolvedValue(expectedResult);

      // Act
      const result = await service.update(payload);

      // Assert
      expect(result).toEqual(User.ToEntityFromPrisma(expectedResult));
      expect(client.update).toHaveBeenCalledWith({
        where: {
          id: payload.id,
        },
        data: updateData,
      });
    });
    it('should update a user even when some fields are missing', async () => {
      const payload = {
        id: '65d9a85d64190930a909d6ba',
        name: {
          firstName: 'John',
          middleName: 'Doe',
          lastName: 'Smith',
        },
      };

      const updateData = {
        name: {
          update: {
            firstName: payload.name.firstName,
            lastName: payload.name.lastName,
            middleName: payload.name.middleName,
          },
        },
      };

      const expectedResult = userStub();

      client.update.mockResolvedValue(expectedResult);

      // Act
      const result = await service.update(payload);

      // Assert
      expect(result).toStrictEqual(User.ToEntityFromPrisma(expectedResult));
      expect(client.update).toHaveBeenCalledWith({
        where: {
          id: payload.id,
        },
        data: updateData,
      });
    });
    it('should update a user even when name is undefined', async () => {
      // Arrange
      const payload = {
        id: '65d9a85d64190930a909d6ba',
        email: 'test@example.com',
      };

      const updateData = {
        email: payload.email,
        username: undefined,
        name: {
          update: {
            firstName: undefined,
            lastName: undefined,
            middleName: undefined,
          },
        },
        picks: undefined,
        picture: undefined,
        devices: undefined,
      };

      const expectedResult = userStub();

      client.update.mockResolvedValue(expectedResult);

      // Act
      const result = await service.update(payload);

      // Assert
      // expect(result.)
      expect(result).toStrictEqual(User.ToEntityFromPrisma(expectedResult));
      expect(client.update).toHaveBeenCalledWith({
        where: {
          id: payload.id,
        },
        data: updateData,
      });
    });
  });

  // describe('getUserDevices', () => {
  //   it('should get devices of multiple users', async () => {
  //     // Test implementation here
  //   });
  // });

  // describe('addMembership', () => {
  //   it('should add a membership to a user', async () => {
  //     // Test implementation here
  //   });
  // });

  // describe('removeMembership', () => {
  //   it('should remove a membership from a user', async () => {
  //     // Test implementation here
  //   });
  // });
});
