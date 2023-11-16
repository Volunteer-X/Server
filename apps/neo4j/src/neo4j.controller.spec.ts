import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jController } from './neo4j.controller';
import { Neo4jService } from './neo4j.service';

describe('Neo4jController', () => {
  let neo4jController: Neo4jController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Neo4jController],
      providers: [Neo4jService],
    }).compile();

    neo4jController = app.get<Neo4jController>(Neo4jController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(neo4jController.getHello()).toBe('Hello World!');
    });
  });
});
