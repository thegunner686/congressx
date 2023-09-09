export const schema = gql`
  type RepresentativeVote {
    id: String!
    voting: Voting!
    votingId: String!
    representative: Representative!
    representativeId: String!
    result: String!
  }

  type Query {
    representativeVotes: [RepresentativeVote!]! @requireAuth
    representativeVote(id: String!): RepresentativeVote @requireAuth
  }

  input CreateRepresentativeVoteInput {
    votingId: String!
    representativeId: String!
    result: String!
  }

  input UpdateRepresentativeVoteInput {
    votingId: String
    representativeId: String
    result: String
  }

  type Mutation {
    createRepresentativeVote(
      input: CreateRepresentativeVoteInput!
    ): RepresentativeVote! @requireAuth
    updateRepresentativeVote(
      id: String!
      input: UpdateRepresentativeVoteInput!
    ): RepresentativeVote! @requireAuth
    deleteRepresentativeVote(id: String!): RepresentativeVote! @requireAuth
  }
`;
