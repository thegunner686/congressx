export const schema = gql`
  type Vote {
    id: String!
    user: User!
    userId: String!
    result: String!
    bill: Bill
    billId: String
    poll: Poll
    pollId: String
  }

  type Query {
    votes: [Vote!]! @requireAuth
    vote(id: String!): Vote @requireAuth
  }

  input CreateVoteInput {
    userId: String!
    result: String!
    billId: String
    pollId: String
  }

  input UpdateVoteInput {
    userId: String
    result: String
    billId: String
    pollId: String
  }

  type Mutation {
    createVote(input: CreateVoteInput!): Vote! @requireAuth
    updateVote(id: String!, input: UpdateVoteInput!): Vote! @requireAuth
    deleteVote(id: String!): Vote! @requireAuth
  }
`;
