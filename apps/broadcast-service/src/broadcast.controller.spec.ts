import { Test, TestingModule } from '@nestjs/testing';
import { BroadcastController } from './broadcast.controller';
import { BroadcastService } from './broadcast.service';

describe('BroadcastServiceController', () => {
  let broadcastController: BroadcastController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BroadcastController],
      providers: [BroadcastService],
    }).compile();

    broadcastController = app.get<BroadcastController>(BroadcastController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(broadcastController.getHello()).toBe('Hello World!');
    });
  });
});
