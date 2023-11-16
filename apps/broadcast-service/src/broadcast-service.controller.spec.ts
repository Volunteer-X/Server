import { Test, TestingModule } from '@nestjs/testing';
import { BroadcastServiceController } from './broadcast-service.controller';
import { BroadcastServiceService } from './broadcast-service.service';

describe('BroadcastServiceController', () => {
  let broadcastServiceController: BroadcastServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BroadcastServiceController],
      providers: [BroadcastServiceService],
    }).compile();

    broadcastServiceController = app.get<BroadcastServiceController>(BroadcastServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(broadcastServiceController.getHello()).toBe('Hello World!');
    });
  });
});
