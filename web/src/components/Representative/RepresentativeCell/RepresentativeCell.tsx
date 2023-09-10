import type { FindRepresentativeById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Representative from "src/components/Representative/Representative";

export const QUERY = gql`
  query FindRepresentativeById($id: String!) {
    representative: representative(id: $id) {
      id
      birthYear
      imageUrl
      honorificName
      directOrderName
      firstName
      lastName
      invertedOrderName
      active
      stateId
      district {
        number
      }
      terms {
        startYear
        endYear
        chamber
        congressNumber
      }
      partyHistory {
        startYear
        party {
          name
          abbreviation
        }
      }
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Representative not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  representative,
}: CellSuccessProps<FindRepresentativeById>) => {
  return <Representative representative={representative} />;
};
