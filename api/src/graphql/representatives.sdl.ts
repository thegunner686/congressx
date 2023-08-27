export const schema = gql`
  type Representative {
    id: String!
    imageUrl: String!
    invertedOrderName: String!
    partyName: String!
    startYear: Int!
    state: String!
    district: Int
    currentChamber: String!
  }

  type Query {
    representatives: [Representative!]! @requireAuth
    representative(id: String!): Representative @requireAuth
    populateRepresentatives: [Representative] @requireAuth
  }

  input CreateRepresentativeInput {
    id: String!
    imageUrl: String!
    invertedOrderName: String!
    partyName: String!
    startYear: Int!
    state: String!
    district: Int
    currentChamber: String!
  }

  input UpdateRepresentativeInput {
    imageUrl: String
    invertedOrderName: String
    partyName: String
    startYear: Int
    state: String
    district: Int
    currentChamber: String
  }

  type Mutation {
    createRepresentative(input: CreateRepresentativeInput!): Representative!
      @requireAuth
    updateRepresentative(
      id: String!
      input: UpdateRepresentativeInput!
    ): Representative! @requireAuth
    deleteRepresentative(id: String!): Representative! @requireAuth
  }
`;
