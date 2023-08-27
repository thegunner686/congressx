import { Link, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { QUERY } from "src/components/State/StatesCell";
import { truncate } from "src/lib/formatters";

import type { DeleteStateMutationVariables, FindStates } from "types/graphql";

const DELETE_STATE_MUTATION = gql`
  mutation DeleteStateMutation($id: String!) {
    deleteState(id: $id) {
      id
    }
  }
`;

const StatesList = ({ states }: FindStates) => {
  const [deleteState] = useMutation(DELETE_STATE_MUTATION, {
    onCompleted: () => {
      toast.success("State deleted");
    },
    onError: (error) => {
      toast.error(error.message);
    },
    // This refetches the query on the list page. Read more about other ways to
    // update the cache over here:
    // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  });

  const onDeleteClick = (id: DeleteStateMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete state " + id + "?")) {
      deleteState({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Abbreviation</th>
            <th>Image url</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {states.map((state) => (
            <tr key={state.id}>
              <td>{truncate(state.id)}</td>
              <td>{truncate(state.name)}</td>
              <td>{truncate(state.abbreviation)}</td>
              <td>{truncate(state.imageUrl)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.state({ id: state.id })}
                    title={"Show state " + state.id + " detail"}
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editState({ id: state.id })}
                    title={"Edit state " + state.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={"Delete state " + state.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(state.id)}
                  >
                    Delete
                  </button>
                </nav>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatesList;
