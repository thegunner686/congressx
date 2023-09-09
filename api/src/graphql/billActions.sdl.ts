export const schema = gql`
  type BillAction {
    id: String!
    code: String!
    date: DateTime!
    text: String!
    type: String!
    bill: Bill!
    billId: String!
  }

  type Query {
    billActions: [BillAction!]! @requireAuth
    billAction(id: String!): BillAction @requireAuth
  }

  input CreateBillActionInput {
    code: String!
    date: DateTime!
    text: String!
    type: String!
    billId: String!
  }

  input UpdateBillActionInput {
    code: String
    date: DateTime
    text: String
    type: String
    billId: String
  }

  type Mutation {
    createBillAction(input: CreateBillActionInput!): BillAction! @requireAuth
    updateBillAction(id: String!, input: UpdateBillActionInput!): BillAction!
      @requireAuth
    deleteBillAction(id: String!): BillAction! @requireAuth
  }
`;
