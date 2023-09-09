export const schema = gql`
  type Leadership {
    id: String!
    representative: Representative!
    representativeId: String!
    congress: Congress!
    congressNumber: Int!
    type: String!
  }

  type Query {
    leaderships: [Leadership!]! @requireAuth
    leadership(id: String!): Leadership @requireAuth
  }

  input CreateLeadershipInput {
    representativeId: String!
    congressNumber: Int!
    type: String!
  }

  input UpdateLeadershipInput {
    representativeId: String
    congressNumber: Int
    type: String
  }

  type Mutation {
    createLeadership(input: CreateLeadershipInput!): Leadership! @requireAuth
    updateLeadership(id: String!, input: UpdateLeadershipInput!): Leadership!
      @requireAuth
    deleteLeadership(id: String!): Leadership! @requireAuth
  }
`;
