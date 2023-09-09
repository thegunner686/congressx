import type { EditStateById, UpdateStateInput } from "types/graphql";

import { navigate, routes } from "@redwoodjs/router";
import type { CellSuccessProps, CellFailureProps } from "@redwoodjs/web";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import StateForm from "src/components/State/StateForm";

export const QUERY = gql`
  query EditStateById($id: String!) {
    state: state(id: $id) {
      id
      name
      imageUrl
    }
  }
`;
const UPDATE_STATE_MUTATION = gql`
  mutation UpdateStateMutation($id: String!, $input: UpdateStateInput!) {
    updateState(id: $id, input: $input) {
      id
      name
      imageUrl
    }
  }
`;

export const Loading = () => <div>Loading...</div>;

export const Failure = ({ error }: CellFailureProps) => (
  <div className="rw-cell-error">{error?.message}</div>
);

export const Success = ({ state }: CellSuccessProps<EditStateById>) => {
  const [updateState, { loading, error }] = useMutation(UPDATE_STATE_MUTATION, {
    onCompleted: () => {
      toast.success("State updated");
      navigate(routes.states());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (
    input: UpdateStateInput,
    id: EditStateById["state"]["id"],
  ) => {
    updateState({ variables: { id, input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit State {state?.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <StateForm
          state={state}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  );
};
