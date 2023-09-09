export const schema = gql`
  type BillSummary {
    id: String!
    bill: Bill!
    billId: String!
    actionDate: DateTime!
    actionDescription: String!
    text: String!
    updateDate: DateTime!
  }

  type Query {
    billSummaries: [BillSummary!]! @requireAuth
    billSummary(id: String!): BillSummary @requireAuth
  }

  input CreateBillSummaryInput {
    billId: String!
    actionDate: DateTime!
    actionDescription: String!
    text: String!
    updateDate: DateTime!
  }

  input UpdateBillSummaryInput {
    billId: String
    actionDate: DateTime
    actionDescription: String
    text: String
    updateDate: DateTime
  }

  type Mutation {
    createBillSummary(input: CreateBillSummaryInput!): BillSummary! @requireAuth
    updateBillSummary(
      id: String!
      input: UpdateBillSummaryInput!
    ): BillSummary! @requireAuth
    deleteBillSummary(id: String!): BillSummary! @requireAuth
  }
`;
