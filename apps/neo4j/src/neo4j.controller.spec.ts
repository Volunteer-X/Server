import { Test, TestingModule } from '@nestjs/testing';
import { Neo4jController } from './neo4j.controller';
import { Neo4jService } from './neo4j.service';
import { RmqContext } from '@nestjs/microservices';

describe('Neo4jController', () => {
  let neo4jController: Neo4jController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Neo4jController],
      providers: [Neo4jService],
    }).compile();

    neo4jController = app.get<Neo4jController>(Neo4jController);
  });

  describe('handlePingCreated', () => {
    let neo4jService: Neo4jService;
    let rmqService: any;
    let ping: string;
    let context: RmqContext;

    beforeEach(() => {
      neo4jService = new Neo4jService();
      rmqService = { ack: jest.fn() };
      ping = JSON.stringify({ id: '1', name: 'ping' });
      context = {} as RmqContext;

      neo4jController = new Neo4jController(neo4jService, rmqService);
      jest
        .spyOn(neo4jService, 'createPing')
        .mockImplementation(() => Promise.resolve());
    });

    it('should call createPing and ack with correct arguments', async () => {
      await neo4jController.handlePingCreated(ping, context);

      expect(neo4jService.createPing).toHaveBeenCalledWith(JSON.parse(ping));
      expect(rmqService.ack).toHaveBeenCalledWith(context);
    });
  });
});
