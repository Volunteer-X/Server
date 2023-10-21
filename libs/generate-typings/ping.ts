import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionFactory = new GraphQLDefinitionsFactory();

definitionFactory.generate({
  typePaths: ['./apps/ping/src/ping/graphql/*.gql'],
  path: join(process.cwd(), 'apps/ping/src/ping/graphql/ping.schema.ts'),
  outputAs: 'interface',
  defaultScalarType: 'unknown',
  customScalarTypeMapping: {
    DateTime: 'typeof GraphQLDateTime',
    ObjectID: 'typeof GraphQLObjectID',
    Longitude: 'typeof GraphQLLongitude',
    Latitude: 'typeof GraphQLLatitude',
    URL: 'typeof GraphQLURL',
  },
  additionalHeader:
    "import { GraphQLDateTime, GraphQLObjectID, GraphQLLatitude, GraphQLLongitude, GraphQLURL } from 'graphql-scalars'",
});
