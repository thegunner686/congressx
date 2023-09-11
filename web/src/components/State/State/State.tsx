import { useMutation } from "@redwoodjs/web";
import { useUserContext } from "src/contexts/UserContext";
import { useCallback, useState } from "react";

import {} from "src/lib/formatters";

import type { FindStateById } from "types/graphql";

export const update_user = gql`
  mutation UpdateUserById($id: String!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      id
    }
  }
`;

interface Props {
  state: NonNullable<FindStateById["state"]>;
}

const State = ({ state }: Props) => {
  const user = useUserContext();
  const [updateUser] = useMutation(update_user, {
    refetchQueries: ["FindUserById"],
  });
  const [loading, setLoading] = useState(false);

  const onClick = useCallback(async () => {
    if (!user) return;
    setLoading(true);

    if (user.stateId) {
      await updateUser({
        variables: {
          id: user.id,
          input: {
            stateId: null,
            districtNumber: null,
          },
        },
      });
    } else {
      await updateUser({
        variables: {
          id: user.id,
          input: {
            stateId: state.id,
            districtNumber: 1,
          },
        },
      });
    }
    setLoading(false);
  }, [user]);

  const hoverClasses = user?.state
    ? ""
    : "hover:border-4 hover:border-verdigris hover:rounded-lg hover:shadow-verdigris";

  return (
    <button
      className={`${
        loading ? "animate-pulse" : ""
      } lg:w-96 lg:h-48 w-72 h-36 relative flex flex-col items-center justify-center cursor-pointer shadow-lg shadow-gray-800 rounded ${hoverClasses} mb-8 transition-all group hover:scale-95 animate-fade-in transition-all`}
      onClick={onClick}
      disabled={loading}
    >
      <img
        src={state.imageUrl}
        className=" w-full h-full object-cover absolute top-0 left-0 rounded"
        loading="lazy"
      />
      <h1 className="relative font-anton uppercase text-white font-extrabold text-5xl text-shadow shadow-gray-500">
        {state.name}
      </h1>
      {user?.state ? (
        <div className="p-1 pl-4 pr-4 border border-white text-white relative rounded group-hover:border-verdigris group-hover:bg-verdigris group-hover:text-white group-hover:bg-opacity-50 top-4 transition-all">
          Change State
        </div>
      ) : null}
    </button>
  );
};

export default State;
