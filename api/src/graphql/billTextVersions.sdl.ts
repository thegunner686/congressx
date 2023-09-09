export const schema = gql`
  type BillTextVersion {
    id: String!
    bill: Bill!
    billId: String!
    date: DateTime
    htmlUrl: String
    pdfUrl: String
  }

  type Query {
    billTextVersions: [BillTextVersion!]! @requireAuth
    billTextVersion(id: String!): BillTextVersion @requireAuth
  }

  input CreateBillTextVersionInput {
    billId: String!
    date: DateTime
    htmlUrl: String
    pdfUrl: String
  }

  input UpdateBillTextVersionInput {
    billId: String
    date: DateTime
    htmlUrl: String
    pdfUrl: String
  }

  type Mutation {
    createBillTextVersion(input: CreateBillTextVersionInput!): BillTextVersion!
      @requireAuth
    updateBillTextVersion(
      id: String!
      input: UpdateBillTextVersionInput!
    ): BillTextVersion! @requireAuth
    deleteBillTextVersion(id: String!): BillTextVersion! @requireAuth
  }
`;
