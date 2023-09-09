export const schema = gql`
  type District {
    id: String!
    state: State!
    stateId: String!
    number: Int!
    representative: Representative!
    representativeId: String!
    residents: [User]!
    polls: [Poll]!
  }

  type Query {
    districts: [District!]! @requireAuth
    district(id: String!): District @requireAuth
  }

  input CreateDistrictInput {
    stateId: String!
    number: Int!
    representativeId: String!
  }

  input UpdateDistrictInput {
    stateId: String
    number: Int
    representativeId: String
  }

  type Mutation {
    createDistrict(input: CreateDistrictInput!): District! @requireAuth
    updateDistrict(id: String!, input: UpdateDistrictInput!): District!
      @requireAuth
    deleteDistrict(id: String!): District! @requireAuth
  }
`;
