import { Test, TestingModule } from '@nestjs/testing';
import { DeletionServiceController } from './deletion-service.controller';
import { DeletionServiceService } from './deletion-service.service';

describe('DeletionServiceController', () => {
  let deletionServiceController: DeletionServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DeletionServiceController],
      providers: [DeletionServiceService],
    }).compile();

    deletionServiceController = app.get<DeletionServiceController>(DeletionServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(deletionServiceController.getHello()).toBe('Hello World!');
    });
  });
});
