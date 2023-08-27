export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    state: String
    district: Int
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: String!): User @requireAuth
  }

  input CreateUserInput {
    id: String!
    email: String!
    name: String
    state: String
    district: Int
  }

  input UpdateUserInput {
    email: String
    name: String
    state: String
    district: Int
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @requireAuth
    updateUser(id: String!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: String!): User! @requireAuth
  }
`;
