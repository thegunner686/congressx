export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    state: State
    stateId: String
    representatives: [Representative]!
    district: District
    districtNumber: Int
    votes: [Vote]!
    comments: [Comment]!
    polls: [Poll]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    stateId: String
    districtNumber: Int
  }

  input UpdateUserInput {
    email: String
    name: String
    stateId: String
    districtNumber: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`;
