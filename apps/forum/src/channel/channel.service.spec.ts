import { DeepMockProxy, mockDeep, mockReset } from 'jest-mock-extended';
import {
  Failure,
  InternalServerError,
  NotFoundError,
  Success,
} from '@app/common';
import { Test, TestingModule } from '@nestjs/testing';
import { channelStub, prismaChannelStub } from './__mocks__/channel.stub';

import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/createChannel.dto';
import { ForumRepository } from '../service/forum.service';
import e from 'express';

describe(ChannelService.name, () => {
  let service: ChannelService;
  let repository: DeepMockProxy<ForumRepository>;
  let client: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChannelService, ForumRepository],
    })
      .overrideProvider(ForumRepository)
      .useValue(mockDeep<ForumRepository>())
      .compile();

    service = module.get<ChannelService>(ChannelService);
    repository = module.get(ForumRepository);

    client = repository.channel;
    mockReset(repository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('when creating a channel', () => {
    const input: CreateChannelDto = {
      title: 'Test',
      admin: '5f7d4138e8017e001fd15e6a',
      activityId: '58a1d20c201f52270b89b2c9',
    };

    it('then it should return a newly created channel', async () => {
      client.create.mockResolvedValue({
        id: '61e4a1f5a6f2b941d59f8c8a',
        title: 'Test',
        admin: '5f7d4138e8017e001fd15e6a',
        activityId: '58a1d20c201f52270b89b2c9',
        createdAt: new Date('2022-01-16T22:53:41.000Z'),
      });
      const result = await service.createChannel(input);
      expect(result).toEqual(
        new Success({
          id: '61e4a1f5a6f2b941d59f8c8a',
          title: 'Test',
          admin: '5f7d4138e8017e001fd15e6a',
          activityId: '58a1d20c201f52270b89b2c9',
          createdAt: new Date('2022-01-16T22:53:41.000Z'),
          participants: undefined,
          ping: {
            __typename: 'Forum',
            id: '58a1d20c201f52270b89b2c9',
          },
        }),
      );

      expect(client.create).toHaveBeenCalled();
    });

    it('then it should return an error', async () => {
      client.create.mockRejectedValue(new Error('Failed to create channel'));
      const result = await service.createChannel(input);
      expect(result).toEqual(
        new Failure(new InternalServerError('Failed to create channel')),
      );
    });
  });

  describe('when getting a channel by id', () => {
    const channelId = '61e4a1f5a6f2b941d59f8c8a';

    it('then it should return the channel', async () => {
      const channel = {
        id: channelId,
        title: 'Test',
        admin: '5f7d4138e8017e001fd15e6a',
        activityId: '58a1d20c201f52270b89b2c9',
        createdAt: new Date('2022-01-16T22:53:41.000Z'),
      };
      client.findUniqueOrThrow.mockResolvedValue(channel);

      const result = await service.getChannel(channelId);
      expect(result).toEqual(channel);
      expect(client.findUniqueOrThrow).toHaveBeenCalledWith({
        where: {
          id: channelId,
        },
      });
    });

    it('then it should return a not found error', async () => {
      const error = new Error('Channel not found');
      client.findUniqueOrThrow.mockRejectedValue(error);

      const result = await service.getChannel(channelId);
      expect(result).toEqual(new NotFoundError('Channel not found'));
      expect(client.findUniqueOrThrow).toHaveBeenCalledWith({
        where: {
          id: channelId,
        },
      });
    });
  });

  describe('when getting a channel by user', () => {
    const author = channelStub().admin;
    const first = 1;
    const after = '61e4a1f5a6f2b941d59f8c8a';

    it('Should return the channels', async () => {
      client.findMany.mockResolvedValue([prismaChannelStub()]);
      const result = await service.getChannelsByUser(author, first, after);
      expect(result).toContainEqual(channelStub());
    });

    it('Should return a NotFoundError if user has no channels', async () => {
      client.findMany.mockResolvedValue([]);
      const result = await service.getChannelsByUser(author, first, after);
      expect(result).toBeInstanceOf(NotFoundError);
      expect(result).toEqual(
        new NotFoundError('No Channel under this user id found'),
      );
    });

    it('Should return an InternalServerError if findMany() throws an error', async () => {
      client.findMany.mockRejectedValue(new Error('Failed to get channels'));
      const result = await service.getChannelsByUser(author, first, after);
      expect(result).toBeInstanceOf(InternalServerError);
      expect(result).toEqual(new InternalServerError('Failed to get channels'));
    });

    it('should return an array of channels when user has channels', async () => {
      client.findMany.mockResolvedValue([prismaChannelStub()]);
      const result = await service.getChannelsByUser(author, first, after);
      expect(result).toContainEqual(channelStub());
      expect(result).toHaveLength(1);
    });
  });

  describe('when getting a channel by admin', () => {
    const admin = channelStub().admin;
    const first = 1;
    const after = { id: '61e4a1f5a6f2b941d59f8c8a' }; // channelId

    it('should return the channels even if after is undefined', async () => {
      repository.$transaction.mockResolvedValue([[prismaChannelStub()], 1]);

      const result = await service.getChannelsByAdmin(admin, first);
      expect(result[0]).toContainEqual(channelStub());
      expect(result[1]).toEqual(1);
    });

    it('Should return an array of channels when admin has channels', async () => {
      repository.$transaction.mockResolvedValue([[prismaChannelStub()], 1]);
      const result = await service.getChannelsByAdmin(admin, first, after);
      expect(result[0]).toContainEqual(channelStub());
      expect(result[1]).toEqual(1);
    });

    it('Should return a NotFoundError if admin has no channels', async () => {
      repository.$transaction.mockResolvedValue([[], 0]);
      const result = await service.getChannelsByAdmin(admin, first, after);
      expect(result).toBeInstanceOf(NotFoundError);
      expect(result).toEqual(
        new NotFoundError('No Channel under this user id found'),
      );
    });

    it('Should return an InternalServerError if findMany() throws an error', async () => {
      repository.$transaction.mockRejectedValue(
        new Error('Failed to get channels'),
      );
      const result = await service.getChannelsByAdmin(admin, first, after);
      expect(result).toBeInstanceOf(InternalServerError);
      expect(result).toEqual(new InternalServerError('Failed to get channels'));
    });

    it("should return all channels and the correct total count when 'first' parameter is greater than the total number of channels", async () => {
      repository.$transaction.mockResolvedValue([[prismaChannelStub()], 1]);
      const result = await service.getChannelsByAdmin(admin, 10);
      expect(result[0]).toContainEqual(channelStub());
      expect(result[1]).toEqual(1);
      expect(repository.$transaction).toHaveBeenCalledWith([
        client.findMany({
          where: {
            admin,
          },
          include: {
            messages: {
              orderBy: {
                id: 'desc',
              },
              take: 1,
            },
          },
          skip: after ? 1 : 0,
          take: first,
          cursor: after,
          orderBy: {
            id: 'asc',
          },
        }),
        client.count({
          where: {
            admin,
          },
        }),
      ]);
    });
  });
});
