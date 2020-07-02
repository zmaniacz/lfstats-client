import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type GetCurrentEvent {
    selectedEventId: Int
  }
`;

export const resolvers = {};
