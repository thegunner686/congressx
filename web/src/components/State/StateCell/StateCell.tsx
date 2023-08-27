import type { FindStateById } from "types/graphql";

import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

import State from "src/components/State/State";

export const QUERY = gql`
  query FindStateById($id: String!) {
    state: state(id: $id) {
      name
      abbreviation
      imageUrl
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>State not found</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ state }: CellSuccessProps<FindStateById>) => {
  return <State state={state} />;
};
