import { NotFoundError } from '@app/common';
import { channelStub } from './channel.stub';

export const ChannelService = jest.fn().mockReturnValue({
  getChannel: jest.fn().mockResolvedValueOnce(channelStub()),
  getChannelsByAdmin: jest.fn().mockResolvedValue([[channelStub()], 1]),
  getChannelsByUser: jest.fn().mockResolvedValue({}),
});
