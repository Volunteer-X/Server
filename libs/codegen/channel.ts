import { GraphQLFederationDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionFactory = new GraphQLFederationDefinitionsFactory();

definitionFactory.generate({
  typePaths: [
    './apps/forum/src/channel/graphql/*.gql',
    './libs/common/src/graphql/*.gql',
  ],
  path: join(process.cwd(), 'apps/forum/src/channel/graphql/channel.schema.ts'),
  outputAs: 'class',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    ObjectID: 'typeof GraphQLObjectID',
    PositiveInt: 'typeof GraphQLPositiveInt',
  },
  watch: true,
  additionalHeader:
    "import { GraphQLObjectID, GraphQLPositiveInt } from 'graphql-scalars'",
});
