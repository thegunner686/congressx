export const schema = gql`
  type Bill {
    id: String!
    title: String!
    introducedDate: DateTime!
    congress: Congress!
    congressNumber: Int!
    originChamber: String!
    type: String!
    number: Int!
    userVotes: [Vote]!
    votings: [Voting]!
    actions: [BillAction]!
    summaries: [BillSummary]!
    textVersions: [BillTextVersion]!
    legislativeSubjects: [BillSubject]!
    sponsors: [Representative]!
    cosponsors: [Representative]!
    comments: [Comment]!
  }

  type Query {
    bills: [Bill!]! @requireAuth
    bill(id: String!): Bill @requireAuth
  }

  input CreateBillInput {
    title: String!
    introducedDate: DateTime!
    congressNumber: Int!
    originChamber: String!
    type: String!
    number: Int!
  }

  input UpdateBillInput {
    title: String
    introducedDate: DateTime
    congressNumber: Int
    originChamber: String
    type: String
    number: Int
  }

  type Mutation {
    createBill(input: CreateBillInput!): Bill! @requireAuth
    updateBill(id: String!, input: UpdateBillInput!): Bill! @requireAuth
    deleteBill(id: String!): Bill! @requireAuth
  }
`;
