export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    state: State
    stateId: String
    representatives: [Representative]!
    district: District
    districtId: String
    votes: [Vote]!
    comments: [Comment]!
    polls: [Poll]!
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    id: String!
    email: String!
    name: String
    stateId: String
    districtId: String
  }

  input UpdateUserInput {
    email: String
    name: String
    stateId: String
    districtId: String
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`;
