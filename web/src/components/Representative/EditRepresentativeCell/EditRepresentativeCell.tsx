import type {
  EditRepresentativeById,
  UpdateRepresentativeInput,
} from "types/graphql";

import { navigate, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import RepresentativeForm from "src/components/Representative/RepresentativeForm";

export const QUERY = gql`
  query EditRepresentativeById($id: String!) {
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
    }
  }
`;
const UPDATE_REPRESENTATIVE_MUTATION = gql`
  mutation UpdateRepresentativeMutation(
    $id: String!
    $input: UpdateRepresentativeInput!
  ) {
    updateRepresentative(id: $id, input: $input) {
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

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({
  representative,
}: CellSuccessProps<EditRepresentativeById>) => {
  const [updateRepresentative, { loading, error }] = useMutation(
    UPDATE_REPRESENTATIVE_MUTATION,
    {
      onCompleted: () => {
        toast.success("Representative updated");
        navigate(routes.representatives());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const onSave = (
    input: UpdateRepresentativeInput,
    id: EditRepresentativeById["representative"]["id"],
  ) => {
    updateRepresentative({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Representative {representative?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <RepresentativeForm
          representative={representative}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
