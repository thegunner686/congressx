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
    <>
      {states.map((state) => (
        <State key={state.id} state={state} />
      ))}
    </>
  );
};

export default StatesList;
