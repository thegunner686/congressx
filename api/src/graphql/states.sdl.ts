export const schema = gql`
  type State {
    id: String!
    name: String!
    abbreviation: String!
    imageUrl: String!
  }

  type Query {
    states: [State!]! @requireAuth
    state(id: String!): State @requireAuth
  }

  input CreateStateInput {
    name: String!
    abbreviation: String!
    imageUrl: String!
  }

  input UpdateStateInput {
    name: String
    abbreviation: String
    imageUrl: String
  }

  type Mutation {
    createState(input: CreateStateInput!): State! @requireAuth
    updateState(id: String!, input: UpdateStateInput!): State! @requireAuth
    deleteState(id: String!): State! @requireAuth
  }
`;
