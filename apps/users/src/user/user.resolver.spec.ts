import { CreateUserInput, UpdateUserInput } from './graphql/user.schema';
import {
  GraphQLEmailAddress,
  GraphQLLatitude,
  GraphQLLongitude,
  GraphQLObjectID,
} from 'graphql-scalars';
import { InternalServerError, UnauthorizedError } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '@nestjs/passport';
import { AuthModule } from '@app/auth';
import { CanActivate } from '@nestjs/common';
import { User } from '@user/entity/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { WrappedPayload } from '@user/common';
import { userStub } from './__mocks__/stubs/user.stub';

jest.mock('./user.service');

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;

  beforeEach(async () => {
    const mockAuthGaurd: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [UserResolver, UserService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGaurd)
      .compile();

    resolver = module.get<UserResolver>(UserResolver);
    service = module.get<UserService>(UserService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return the current user', () => {
      const result = resolver.getUser(userStub());

      expect(result).toStrictEqual(WrappedPayload.wrap(userStub()));
    });
    it('should return an error if the user is not found', () => {
      const result = resolver.getUser(new UnauthorizedError('Unauthorized'));

      expect(result).toBeInstanceOf(UnauthorizedError);
    });
  });

  describe('isUsernameAvailable', () => {
    it('should check if the username is available', async () => {
      // Arrange
      const username = 'testUsername';
      const isAvailable = true;
      jest.spyOn(service, 'isUsernameAvailable').mockResolvedValue(isAvailable);

      // Act
      const result = await resolver.isUsernameAvailable(username);

      // Assert
      expect(service.isUsernameAvailable).toHaveBeenCalledWith(username);
      expect(result).toBe(isAvailable);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const id = userStub().id as unknown as typeof GraphQLObjectID;

      const spy = jest
        .spyOn(service, 'getUserById')
        .mockResolvedValue(userStub());

      const result = await resolver.getUserById(id);

      expect(spy).toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith(userStub().id);
      expect(result).toStrictEqual(userStub());
    });
    it('should return an NotFoundError if the user is not found', async () => {
      const id = userStub().id as unknown as typeof GraphQLObjectID;

      jest
        .spyOn(service, 'getUserById')
        .mockResolvedValue(new UnauthorizedError('Unauthorized'));

      const result = await resolver.getUserById(id);

      expect(result).toBeInstanceOf(UnauthorizedError);
    });
  });

  describe('createUser', () => {
    let payload: CreateUserInput;

    beforeAll(() => {
      payload = {
        email: userStub().email as unknown as typeof GraphQLEmailAddress,
        username: userStub().username,
        firstName: userStub().name.firstName,
        lastName: userStub().name.lastName,
        middleName: userStub().name.middleName,
        picture: userStub().picture,
        picks: userStub().picks,
        latitude: 80.23 as unknown as typeof GraphQLLatitude,
        longitude: 90.23 as unknown as typeof GraphQLLongitude,
        device: userStub().devices[0],
      };
    });

    it('should create a new user', async () => {
      const result = await resolver.create(payload);

      jest.spyOn(service, 'createUser').mockResolvedValue(userStub());

      expect(service.createUser).toHaveBeenCalledWith(
        User.ToEntityFromInput(payload),
      );
      expect(result).toStrictEqual(WrappedPayload.wrap(userStub()));
    });
    it('should return an error if the user is not created', async () => {
      jest
        .spyOn(service, 'createUser')
        .mockResolvedValue(new InternalServerError('Internal Server Error'));

      const result = await resolver.create(payload);

      expect(result).toBeInstanceOf(InternalServerError);
    });
  });

  describe('updateUser', () => {
    let payload: UpdateUserInput;

    beforeAll(() => {
      payload = {
        id: userStub().id as unknown as typeof GraphQLObjectID,
        email: userStub().email as unknown as typeof GraphQLEmailAddress,
        username: userStub().username,
        firstName: userStub().name.firstName,
        lastName: userStub().name.lastName,
        middleName: userStub().name.middleName,
        picture: userStub().picture,
        picks: userStub().picks,
        devices: userStub().devices,
      };
    });

    it('should be defined', () => {
      expect(resolver.updateUser).toBeDefined();
    });
    it('should update a user', async () => {
      const result = await resolver.updateUser(payload);

      jest.spyOn(service, 'update').mockResolvedValue(userStub());

      expect(service.update).toHaveBeenCalledWith(
        User.ToEntityFromUpdate(payload),
      );
      expect(result).toStrictEqual(userStub());
    });

    it('should return an error if the user is not updated', async () => {
      jest
        .spyOn(service, 'update')
        .mockResolvedValue(new InternalServerError('Internal Server Error'));

      const result = await resolver.updateUser(payload);

      expect(result).toBeInstanceOf(InternalServerError);
    });
  });

  // describe('resolveReference', () => {
  //   it('should resolve a user reference', () => {
  //     // Test implementation here
  //   });
  // });
});
