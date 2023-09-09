import { Link, routes } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";

import { QUERY } from "src/components/State/StatesCell";
import { truncate } from "src/lib/formatters";

import type { DeleteStateMutationVariables, FindStates } from "types/graphql";
import State from "../State/State";

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

  return (
    <section className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {[...states]
        .sort((s1, s2) => s1.name.localeCompare(s2.name))
        .map((state) => (
          <State key={state.id} state={state} />
        ))}
    </section>
  );
};

export default StatesList;
