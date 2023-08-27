import type { RepresentativesQuery } from "types/graphql";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";

export const QUERY = gql`
  query RepresentativesQuery {
    representatives {
      id
    }
  }
`;
export const Loading = () => <div>Loading...</div>;

export const Empty = () => <div>Empty</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: "red" }}>Error: {error?.message}</div>
);

export const Success = ({
  representatives,
}: CellSuccessProps<RepresentativesQuery>) => {
  return (
    <ul>
      {representatives.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>;
      })}
    </ul>
  );
};
