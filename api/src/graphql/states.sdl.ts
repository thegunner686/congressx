export const schema = gql`
  type State {
    id: String!
    name: String!
    imageUrl: String!
    representatives: [Representative]!
    residents: [User]!
    districts: [District]!
    polls: [Poll]!
  }

  type Query {
    states: [State!]! @requireAuth
    state(id: String!): State @requireAuth
  }

  input CreateStateInput {
    name: String!
    imageUrl: String!
  }

  input UpdateStateInput {
    name: String
    imageUrl: String
  }

  type Mutation {
    createState(input: CreateStateInput!): State! @requireAuth
    updateState(id: String!, input: UpdateStateInput!): State! @requireAuth
    deleteState(id: String!): State! @requireAuth
  }
`;
