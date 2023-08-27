import { navigate, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import StateForm from "src/components/State/StateForm";

import type { CreateStateInput } from "types/graphql";

const CREATE_STATE_MUTATION = gql`
  mutation CreateStateMutation($input: CreateStateInput!) {
    createState(input: $input) {
      id
    }
  }
`;

const NewState = () => {
  const [createState, { loading, error }] = useMutation(CREATE_STATE_MUTATION, {
    onCompleted: () => {
      toast.success("State created");
      navigate(routes.states());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSave = (input: CreateStateInput) => {
    createState({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New State</h2>
      </header>
      <div className="rw-segment-main">
        <StateForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewState;
