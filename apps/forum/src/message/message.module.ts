import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { Context } from 'graphql-ws';
import { ForumRepository } from '../service/forum.service';
import { GraphQLModule } from '@nestjs/graphql';
import { MessageResolver } from './message.resolver';
import { MessageService } from './message.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  providers: [MessageResolver, MessageService, ForumRepository],
  exports: [MessageService],
})
export class MessageModule {}
