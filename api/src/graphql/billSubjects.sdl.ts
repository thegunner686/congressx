export const schema = gql`
  type BillSubject {
    id: String!
    name: String!
    bills: [Bill]!
    type: String!
  }

  type Query {
    billSubjects: [BillSubject!]! @requireAuth
    billSubject(id: String!): BillSubject @requireAuth
  }

  input CreateBillSubjectInput {
    name: String!
    type: String!
  }

  input UpdateBillSubjectInput {
    name: String
    type: String
  }

  type Mutation {
    createBillSubject(input: CreateBillSubjectInput!): BillSubject! @requireAuth
    updateBillSubject(
      id: String!
      input: UpdateBillSubjectInput!
    ): BillSubject! @requireAuth
    deleteBillSubject(id: String!): BillSubject! @requireAuth
  }
`;
