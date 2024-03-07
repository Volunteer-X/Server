import { userStub } from './stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockResolvedValue(userStub()),
  isUsernameAvailable: jest.fn().mockResolvedValue(true),
  getUserById: jest.fn().mockResolvedValue(userStub()),
  update: jest.fn().mockResolvedValue(userStub()),
});
