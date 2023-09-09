export const schema = gql`
  type Voting {
    id: String!
    bill: Bill!
    billId: String!
    votes: [RepresentativeVote]!
    congress: Int!
    session: String!
    rollCallNumber: Int!
    status: String!
    type: String!
  }

  type Query {
    votings: [Voting!]! @requireAuth
    voting(id: String!): Voting @requireAuth
  }

  input CreateVotingInput {
    billId: String!
    congress: Int!
    session: String!
    rollCallNumber: Int!
    status: String!
    type: String!
  }

  input UpdateVotingInput {
    billId: String
    congress: Int
    session: String
    rollCallNumber: Int
    status: String
    type: String
  }

  type Mutation {
    createVoting(input: CreateVotingInput!): Voting! @requireAuth
    updateVoting(id: String!, input: UpdateVotingInput!): Voting! @requireAuth
    deleteVoting(id: String!): Voting! @requireAuth
  }
`;
