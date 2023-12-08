import { GraphQLFederationDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionFactory = new GraphQLFederationDefinitionsFactory();

definitionFactory.generate({
  typePaths: ['./apps/ping/src/ping/graphql/*.gql'],
  path: join(process.cwd(), 'apps/ping/src/ping/graphql/ping.schema.ts'),
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    DateTime: 'typeof GraphQLDateTime',
    Longitude: 'typeof GraphQLLongitude',
    Latitude: 'typeof GraphQLLatitude',
    URL: 'typeof GraphQLURL',
  },
  watch: true,
  additionalHeader:
    "import { GraphQLDateTime, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from 'graphql-scalars'",
});
