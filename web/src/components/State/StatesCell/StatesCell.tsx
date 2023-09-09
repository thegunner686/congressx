import type { FindStates } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import States from "src/components/State/States";

export const QUERY = gql`
  query FindStates {
    states {
      id
      name
      imageUrl
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {"No states yet. "}
      <Link to={routes.newState()} className="rw-link">
        {"Create one?"}
      </Link>
    </div>
  );
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ states }: CellSuccessProps<FindStates>) => {
  return <States states={states} />;
};
