export const schema = gql`
  type Session {
    id: String!
    congress: Congress
    congressNumber: Int!
    chamber: String!
    startDate: DateTime!
    endDate: DateTime!
    type: String!
    number: Int!
  }

  type Query {
    sessions: [Session!]! @requireAuth
    session(id: String!): Session @requireAuth
  }

  input CreateSessionInput {
    congressNumber: Int!
    chamber: String!
    startDate: DateTime!
    endDate: DateTime!
    type: String!
    number: Int!
  }

  input UpdateSessionInput {
    congressNumber: Int
    chamber: String
    startDate: DateTime
    endDate: DateTime
    type: String
    number: Int
  }

  type Mutation {
    createSession(input: CreateSessionInput!): Session! @requireAuth
    updateSession(id: String!, input: UpdateSessionInput!): Session!
      @requireAuth
    deleteSession(id: String!): Session! @requireAuth
  }
`;
