import type { FindRepresentatives } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import Representatives from "src/components/Representative/Representatives";

export const QUERY = gql`
  query FindRepresentatives {
    representatives {
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
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {"No representatives yet. "}
      <Link to={routes.newRepresentative()} className="rw-link">
        {"Create one?"}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  representatives,
}: CellSuccessProps<FindRepresentatives>) => {
  return <Representatives representatives={representatives} />;
};
