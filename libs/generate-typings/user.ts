import { GraphQLFederationDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionFactory = new GraphQLFederationDefinitionsFactory();

definitionFactory.generate({
  typePaths: ['./apps/users/src/user/graphql/*.gql'],
  path: join(process.cwd(), 'apps/users/src/user/graphql/user.schema.ts'),
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    DateTime: 'typeof GraphQLDateTime',
    EmailAddress: 'typeof GraphQLEmailAddress',
    ObjectID: 'typeof GraphQLObjectID',
  },
  watch: true,
  additionalHeader:
    "import { GraphQLDateTime, GraphQLEmailAddress, GraphQLObjectID } from 'graphql-scalars'",
});
