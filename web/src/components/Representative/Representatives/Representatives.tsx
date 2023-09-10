import { Link, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { QUERY } from "src/components/Representative/RepresentativesCell";
import { checkboxInputTag, truncate } from "src/lib/formatters";

import type {
  DeleteRepresentativeMutationVariables,
  FindRepresentatives,
} from "types/graphql";

const DELETE_REPRESENTATIVE_MUTATION = gql`
  mutation DeleteRepresentativeMutation($id: String!) {
    deleteRepresentative(id: $id) {
      id
    }
  }
`;

const RepresentativesList = ({ representatives }: FindRepresentatives) => {
  const [deleteRepresentative] = useMutation(DELETE_REPRESENTATIVE_MUTATION, {
    onCompleted: () => {
      toast.success("Representative deleted");
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

  const onDeleteClick = (id: DeleteRepresentativeMutationVariables["id"]) => {
    if (confirm("Are you sure you want to delete representative " + id + "?")) {
      deleteRepresentative({ variables: { id } });
    }
  };

  return (
    <div className="rw-segment rw-table-wrapper-responsive">
      <table className="rw-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Birth year</th>
            <th>Image url</th>
            <th>Honorific name</th>
            <th>Direct order name</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Inverted order name</th>
            <th>Active</th>
            <th>State id</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {representatives.map((representative) => (
            <tr key={representative.id}>
              <td>{truncate(representative.id)}</td>
              <td>{truncate(representative.birthYear)}</td>
              <td>{truncate(representative.imageUrl)}</td>
              <td>{truncate(representative.honorificName)}</td>
              <td>{truncate(representative.directOrderName)}</td>
              <td>{truncate(representative.firstName)}</td>
              <td>{truncate(representative.lastName)}</td>
              <td>{truncate(representative.invertedOrderName)}</td>
              <td>{checkboxInputTag(representative.active)}</td>
              <td>{truncate(representative.stateId)}</td>
              <td>
                <nav className="rw-table-actions">
                  <Link
                    to={routes.representative({ id: representative.id })}
                    title={
                      "Show representative " + representative.id + " detail"
                    }
                    className="rw-button rw-button-small"
                  >
                    Show
                  </Link>
                  <Link
                    to={routes.editRepresentative({ id: representative.id })}
                    title={"Edit representative " + representative.id}
                    className="rw-button rw-button-small rw-button-blue"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    title={"Delete representative " + representative.id}
                    className="rw-button rw-button-small rw-button-red"
                    onClick={() => onDeleteClick(representative.id)}
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

export default RepresentativesList;
