export const schema = gql`
  type Poll {
    id: String!
    title: String!
    text: String!
    state: State!
    stateId: String!
    district: District
    districtId: String
    createdBy: User!
    userId: String!
    comments: [Comment]!
    votes: [Vote]!
    createdOn: DateTime!
  }

  type Query {
    polls: [Poll!]! @requireAuth
    poll(id: String!): Poll @requireAuth
  }

  input CreatePollInput {
    title: String!
    text: String!
    stateId: String!
    districtId: String
    userId: String!
    createdOn: DateTime!
  }

  input UpdatePollInput {
    title: String
    text: String
    stateId: String
    districtId: String
    userId: String
    createdOn: DateTime
  }

  type Mutation {
    createPoll(input: CreatePollInput!): Poll! @requireAuth
    updatePoll(id: String!, input: UpdatePollInput!): Poll! @requireAuth
    deletePoll(id: String!): Poll! @requireAuth
  }
`;
