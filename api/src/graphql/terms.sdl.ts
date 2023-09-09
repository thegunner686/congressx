export const schema = gql`
  type Term {
    id: String!
    chamber: String!
    congress: Congress!
    congressNumber: Int!
    startYear: Int!
    endYear: Int
    representative: Representative!
    representativeId: String!
  }

  type Query {
    terms: [Term!]! @requireAuth
    term(id: String!): Term @requireAuth
  }

  input CreateTermInput {
    chamber: String!
    congressNumber: Int!
    startYear: Int!
    endYear: Int
    representativeId: String!
  }

  input UpdateTermInput {
    chamber: String
    congressNumber: Int
    startYear: Int
    endYear: Int
    representativeId: String
  }

  type Mutation {
    createTerm(input: CreateTermInput!): Term! @requireAuth
    updateTerm(id: String!, input: UpdateTermInput!): Term! @requireAuth
    deleteTerm(id: String!): Term! @requireAuth
  }
`;
