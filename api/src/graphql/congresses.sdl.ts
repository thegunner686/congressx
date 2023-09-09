export const schema = gql`
  type Congress {
    number: Int!
    name: String!
    startYear: Int!
    endYear: Int!
    sessions: [Session]!
    members: [Representative]!
    bills: [Bill]!
    leadership: [Leadership]!
    terms: [Term]!
  }

  type Query {
    congresses: [Congress!]! @requireAuth
    congress(id: Int!): Congress @requireAuth
  }

  input CreateCongressInput {
    number: Int!
    name: String!
    startYear: Int!
    endYear: Int!
  }

  input UpdateCongressInput {
    number: Int
    name: String
    startYear: Int
    endYear: Int
  }

  type Mutation {
    createCongress(input: CreateCongressInput!): Congress! @requireAuth
    updateCongress(id: Int!, input: UpdateCongressInput!): Congress!
      @requireAuth
    deleteCongress(id: Int!): Congress! @requireAuth
  }
`;
