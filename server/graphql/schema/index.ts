/**
 * Primary file for GraphQL Schema
 * @author Jemin Patel <pateljeminb@gmail.com>
 */

import { gql } from 'apollo-server-express';
import { ApolloServerExpressConfig } from 'apollo-server-express';
import resolvers from '../resolvers/index';

const typeDefs = gql`
  type Query {
    currencyRate(symbols: String!): Info!
  }

  type Info {
    rate: Float!,
    symbols: String!
  }
`;

const schema: ApolloServerExpressConfig = {
    typeDefs,
    resolvers
};

export default schema;
