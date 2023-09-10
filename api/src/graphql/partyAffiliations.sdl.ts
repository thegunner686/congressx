export const schema = gql`
  type PartyAffiliation {
    id: String!
    representative: Representative!
    representativeId: String!
    party: Party!
    partyName: String!
    startYear: Int!
  }

  type Query {
    partyAffiliations: [PartyAffiliation!]! @requireAuth
    partyAffiliation(id: String!): PartyAffiliation @requireAuth
  }

  input CreatePartyAffiliationInput {
    representativeId: String!
    partyName: String!
    startYear: Int!
  }

  input UpdatePartyAffiliationInput {
    representativeId: String
    partyName: String
    startYear: Int!
  }

  type Mutation {
    createPartyAffiliation(
      input: CreatePartyAffiliationInput!
    ): PartyAffiliation! @requireAuth
    updatePartyAffiliation(
      id: String!
      input: UpdatePartyAffiliationInput!
    ): PartyAffiliation! @requireAuth
    deletePartyAffiliation(id: String!): PartyAffiliation! @requireAuth
  }
`;
