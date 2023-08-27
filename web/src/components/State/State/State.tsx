import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import {} from "src/lib/formatters";

import type {
  DeleteStateMutationVariables,
  FindStateById,
} from "types/graphql";

const DELETE_STATE_MUTATION = gql`
  mutation DeleteStateMutation($id: String!) {
    deleteState(id: $id) {
      id
    }
  }
`;

interface Props {
  state: NonNullable<FindStateById["state"]>;
}

const State = ({ state }: Props) => {
  const [deleteState] = useMutation(DELETE_STATE_MUTATION, {
    onCompleted: () => {
      toast.success("State deleted");
      navigate(routes.states());
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onDeleteClick = (id: DeleteStateMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete state " + id + "?")) {
      deleteState({ variables: { id } });
    }
  };

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            State {state.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{state.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{state.name}</td>
            </tr>
            <tr>
              <th>Abbreviation</th>
              <td>{state.abbreviation}</td>
            </tr>
            <tr>
              <th>Image url</th>
              <td>{state.imageUrl}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.editState({ id: state.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <button
          type="button"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(state.id)}
        >
          Delete
        </button>
      </nav>
    </>
  );
};

export default State;
