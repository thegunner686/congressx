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

export const Loading = () => (
  <div className="animate-pulse transition-all h-fit m-2 flex flex-row w-full">
    <div className="bg-night bg-opacity-80 flex-1 p-2 shadow rounded h-48">
      {" "}
    </div>
    <div className="w-48"></div>
  </div>
);

export const Empty = () => <div>Bill not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ bill }: CellSuccessProps<FindBillById>) => {
  return <Bill bill={bill} />;
};
