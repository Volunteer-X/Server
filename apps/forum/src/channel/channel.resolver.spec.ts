import { Cursor, NotFoundError } from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';
import { channelStub, paginatedChannelStub } from './__mocks__/channel.stub';

import { AuthGuard } from '@nestjs/passport';
import { AuthModule } from '@app/auth';
import { CanActivate } from '@nestjs/common';
import { ChannelResolver } from './channel.resolver';
import { ChannelService } from './channel.service';

jest.mock('./channel.service');

describe('ChannelResolver', () => {
  let resolver: ChannelResolver;
  let service: ChannelService;

  beforeEach(async () => {
    const mockAuthGaurd: CanActivate = { canActivate: jest.fn(() => true) };
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      providers: [ChannelResolver, ChannelService],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGaurd)
      .compile();

    resolver = module.get<ChannelResolver>(ChannelResolver);
    service = module.get<ChannelService>(ChannelService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getChannel', () => {
    it('should return the channel when it exists', async () => {
      // Arrange
      const channelId = '61e4a1f5a6f2b941d59f8c8a';
      const expectedChannel = channelStub();

      // Act
      const result = await resolver.getChannel(channelId);

      // Assert
      expect(result).toStrictEqual(expectedChannel);
      expect(service.getChannel).toHaveBeenCalledWith(channelId);
    });

    it('should return an error if the channel is not found', async () => {
      // Arrange
      const channelId = '61e4a1f5a6f2b941d59f8c8a';
      const expectedError = new NotFoundError('Channel not found');
      jest.spyOn(service, 'getChannel').mockResolvedValue(expectedError);

      // Act
      const result = await resolver.getChannel(channelId);

      // Assert
      expect(result).toStrictEqual(expectedError);
      expect(result).toBeInstanceOf(NotFoundError);
    });
  });

  describe('getChannelsByAdmin', () => {
    it('should return the channels for the specified admin', async () => {
      // Arrange
      const admin = channelStub().admin;
      const first = 10;
      const after = 'eyJpZCI6IjYxZTRhMWY1YTZmMmI5NDFkNTlmOGM4YSJ9';
      const expectedChannels = paginatedChannelStub();

      // Act
      const result = await resolver.getChannelsByAdmin(admin, first, after);

      // Assert
      expect(result).toStrictEqual(expectedChannels);
      expect(service.getChannelsByAdmin).toHaveBeenCalledWith(
        admin,
        first + 1,
        Cursor.fromString(after),
      );
    });

    it('should return an error if the channels are not found', async () => {
      // Arrange
      const admin = channelStub().admin;
      const first = 10;
      const after = 'eyJpZCI6IjYxZTRhMWY1YTZmMmI5NDFkNTlmOGM4YSJ9';
      const expectedError = new NotFoundError('Channels not found');
      jest
        .spyOn(service, 'getChannelsByAdmin')
        .mockResolvedValue(expectedError);

      // Act
      const result = await resolver.getChannelsByAdmin(admin, first, after);

      // Assert
      expect(result).toStrictEqual(expectedError);
      expect(result).toBeInstanceOf(NotFoundError);
    });
  });

  describe('getChannelsByUser', () => {
    it('should return the channels for the specified user', async () => {
      // Arrange
      const user = channelStub().admin;
      const first = 10;
      const after = 'eyJpZCI6IjYxZTRhMWY1YTZmMmI5NDFkNTlmOGM4YSJ9';

      const expectedChannels = paginatedChannelStub();

      // Act
      const result = await resolver.getChannelsByUser(user, first, after);

      // Assert
      expect(result).toStrictEqual(expectedChannels);
      expect(service.getChannelsByUser).toHaveBeenCalledWith(
        user,
        first + 1,
        Cursor.fromString(after),
      );
    });
    it('should return an error if the channels are not found', async () => {
      // Arrange
      const admin = channelStub().admin;
      const first = 10;
      const after = 'eyJpZCI6IjYxZTRhMWY1YTZmMmI5NDFkNTlmOGM4YSJ9';
      const expectedError = new NotFoundError('Channels not found');
      jest.spyOn(service, 'getChannelsByUser').mockResolvedValue(expectedError);

      // Act
      const result = await resolver.getChannelsByUser(admin, first, after);

      // Assert
      expect(result).toStrictEqual(expectedError);
      expect(result).toBeInstanceOf(NotFoundError);
    });
  });
});
