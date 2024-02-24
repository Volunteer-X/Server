import { Test, TestingModule } from '@nestjs/testing';

import { AuthGuard } from '@nestjs/passport';
import { AuthModule } from '@app/auth';
import { CanActivate } from '@nestjs/common';
import { GraphQLObjectID } from 'graphql-scalars';
import { UnauthorizedError } from './graphql/user.schema';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { WrappedPayload } from '@user/common';
import { userStub } from './__mocks__/stubs/user.stub';

jest.mock('./user.service');

describe('UserResolver', () => {
  let resolver: UserResolver;
  let service: UserService;
  let wrapPayload: WrappedPayload;

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
    wrapPayload = new WrappedPayload();
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getUser', () => {
    it('should return the current user', () => {
      const result = resolver.getUser(userStub());

      expect(result).toStrictEqual(wrapPayload.wrap(userStub()));
    });
    it('should return an error if the user is not found', () => {
      const result = resolver.getUser(new UnauthorizedError());

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
        .mockResolvedValue(new UnauthorizedError());

      const result = await resolver.getUserById(id);

      expect(result).toBeInstanceOf(UnauthorizedError);
    });
  });

  // describe('createUser', () => {
  //   it('should create a new user', () => {
  //     // Test implementation here
  //   });
  // });

  // describe('updateUser', () => {
  //   it('should update a user', () => {
  //     // Test implementation here
  //   });
  // });

  // describe('resolveReference', () => {
  //   it('should resolve a user reference', () => {
  //     // Test implementation here
  //   });
  // });
});
