import { navigate, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import RepresentativeForm from "src/components/Representative/RepresentativeForm";

import type { CreateRepresentativeInput } from "types/graphql";

const CREATE_REPRESENTATIVE_MUTATION = gql`
  mutation CreateRepresentativeMutation($input: CreateRepresentativeInput!) {
    createRepresentative(input: $input) {
      id
    }
  }
`;

const NewRepresentative = () => {
  const [createRepresentative, { loading, error }] = useMutation(
    CREATE_REPRESENTATIVE_MUTATION,
    {
      onCompleted: () => {
        toast.success("Representative created");
        navigate(routes.representatives());
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const onSave = (input: CreateRepresentativeInput) => {
    createRepresentative({ variables: { input } });
  };

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Representative</h2>
      </header>
      <div className="rw-segment-main">
        <RepresentativeForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  );
};

export default NewRepresentative;
