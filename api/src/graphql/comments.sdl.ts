export const schema = gql`
  type Comment {
    id: String!
    user: User!
    userId: String!
    text: String!
    bill: Bill
    billId: String
    poll: Poll
    pollId: String
  }

  type Query {
    comments: [Comment!]! @requireAuth
    comment(id: String!): Comment @requireAuth
  }

  input CreateCommentInput {
    userId: String!
    text: String!
    billId: String
    pollId: String
  }

  input UpdateCommentInput {
    userId: String
    text: String
    billId: String
    pollId: String
  }

  type Mutation {
    createComment(input: CreateCommentInput!): Comment! @requireAuth
    updateComment(id: String!, input: UpdateCommentInput!): Comment!
      @requireAuth
    deleteComment(id: String!): Comment! @requireAuth
  }
`;
