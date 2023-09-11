import type { FindBillById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Bill from "src/components/Bill/Bill";

export const QUERY = gql`
  query FindBillById($id: String!) {
    bill(id: $id) {
      id
      title
      introducedDate
      number
      type
      congress {
        number
        name
        startYear
        endYear
      }
      userVotes {
        result
      }
      votings {
        status
        type
        votes {
          id
          representative {
            ...RepresentativeAttributes
          }
          result
        }
      }
      summaries {
        text
        actionDate
      }
      legislativeSubjects {
        id
        name
      }
      sponsors {
        ...RepresentativeAttributes
      }
      cosponsors {
        ...RepresentativeAttributes
      }
    }
  }

  fragment RepresentativeAttributes on Representative {
    id
    directOrderName
    imageUrl
    state {
      id
      name
    }
    partyHistory {
      partyName
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Bill not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ bill }: CellSuccessProps<FindBillById>) => {
  return <Bill bill={bill} />;
};
