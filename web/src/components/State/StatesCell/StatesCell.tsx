import type { FindStates } from "types/graphql";

import { Link, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import States from "src/components/State/States";

export const QUERY = gql`
  query FindStates {
    states {
      id
      name
      abbreviation
      imageUrl
    }
  }
`;

export const Loading = () => (
  <div className="w-96 h-48 bg-gray-200 shadow-gray-100 shadow rounded animate-pulse"></div>
);

export const Empty = () => {
  return <></>;
};

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ states }: CellSuccessProps<FindStates>) => {
  return <States states={states} />;
};
