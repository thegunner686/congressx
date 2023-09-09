export const schema = gql`
  type Representative {
    id: String!
    birthYear: Int!
    imageUrl: String!
    honorificName: String!
    directOrderName: String!
    firstName: String!
    lastName: String!
    invertedOrderName: String!
    leadership: [Leadership]!
    partyHistory: [PartyAffiliation]!
    active: Boolean!
    terms: [Term]!
    state: State
    stateId: String
    constituents: [User]!
    district: District
    votes: [RepresentativeVote]!
    sponsoredBills: [Bill]!
    cosponsoredBills: [Bill]!
    congresses: [Congress]!
  }

  type Query {
    representatives: [Representative!]! @requireAuth
    representative(id: String!): Representative @requireAuth
  }

  input CreateRepresentativeInput {
    birthYear: Int!
    imageUrl: String!
    honorificName: String!
    directOrderName: String!
    firstName: String!
    lastName: String!
    invertedOrderName: String!
    active: Boolean!
    stateId: String
  }

  input UpdateRepresentativeInput {
    birthYear: Int
    imageUrl: String
    honorificName: String
    directOrderName: String
    firstName: String
    lastName: String
    invertedOrderName: String
    active: Boolean
    stateId: String
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
