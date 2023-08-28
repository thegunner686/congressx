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
  // const [deleteState] = useMutation(DELETE_STATE_MUTATION, {
  //   onCompleted: () => {
  //     toast.success("State deleted");
  //   },
  //   onError: (error) => {
  //     toast.error(error.message);
  //   },
  //   // This refetches the query on the list page. Read more about other ways to
  //   // update the cache over here:
  //   // https://www.apollographql.com/docs/react/data/mutations/#making-all-other-cache-updates
  //   refetchQueries: [{ query: QUERY }],
  //   awaitRefetchQueries: true,
  // });

  // const onDeleteClick = (id: DeleteStateMutationVariables["id"]) => {
  //   if (confirm("Are you sure you want to delete state " + id + "?")) {
  //     deleteState({ variables: { id } });
  //   }
  // };

  return (
    <section className="flex flex-col items-center justify-start w-full pt-4">
      {states.map((state) => {
        return (
          <div
            key={state.id}
            className="w-96 h-48 relative flex items-center justify-center cursor-pointer shadow-lg shadow-gray-400 rounded hover:border-4 hover:border-verdigris hover:rounded-lg hover:shadow-verdigris mb-8"
          >
            <img
              src={state.imageUrl}
              className=" w-full h-full object-cover absolute top-0 left-0 rounded"
            />
            <h1 className="relative font-anton uppercase text-white font-extrabold text-5xl text-shadow shadow-gray-500">
              {state.name}
            </h1>
          </div>
        );
      })}
    </section>
  );
};

export default StatesList;
