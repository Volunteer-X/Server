import { Test, TestingModule } from '@nestjs/testing';
import { FileFlowEngineController } from './file-flow-engine.controller';
import { FileFlowEngineService } from './file-flow-engine.service';

describe('FileFlowEngineController', () => {
  let fileFlowEngineController: FileFlowEngineController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FileFlowEngineController],
      providers: [FileFlowEngineService],
    }).compile();

    fileFlowEngineController = app.get<FileFlowEngineController>(FileFlowEngineController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fileFlowEngineController.getHello()).toBe('Hello World!');
    });
  });
});
