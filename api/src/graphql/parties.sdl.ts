export const schema = gql`
  type Party {
    name: String!
    abbreviation: String!
    affiliations: [PartyAffiliation]!
  }

  type Query {
    parties: [Party!]! @requireAuth
    party(id: String!): Party @requireAuth
  }

  input CreatePartyInput {
    name: String!
    abbreviation: String!
  }

  input UpdatePartyInput {
    name: String
    abbreviation: String
  }

  type Mutation {
    createParty(input: CreatePartyInput!): Party! @requireAuth
    updateParty(id: String!, input: UpdatePartyInput!): Party! @requireAuth
    deleteParty(id: String!): Party! @requireAuth
  }
`;
