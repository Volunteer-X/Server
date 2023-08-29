import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionFactory = new GraphQLDefinitionsFactory();

definitionFactory.generate({
  typePaths: ['./apps/users/src/users/graphql/*.gql'],
  path: join(process.cwd(), 'apps/users/src/users/graphql/user.schema.ts'),
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    DateTime: 'typeof GraphQLDateTime',
    Email: 'typeof GraphQLEmailAddress',
    ObjectID: 'typeof GraphQLObjectID',
  },
  additionalHeader:
    "import { GraphQLDateTime, GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars'",
});
