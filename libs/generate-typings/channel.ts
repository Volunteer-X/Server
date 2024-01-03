import { GraphQLFederationDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionFactory = new GraphQLFederationDefinitionsFactory();

definitionFactory.generate({
  typePaths: ['./apps/forum/src/channel/graphql/*.gql'],
  path: join(process.cwd(), 'apps/forum/src/channel/graphql/channel.schema.ts'),
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    ObjectID: 'typeof GraphQLObjectID',
  },
  watch: true,
  additionalHeader: "import { GraphQLObjectID } from 'graphql-scalars'",
});
