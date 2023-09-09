// import { Link, routes, navigate } from "@redwoodjs/router";
// import { useMutation } from "@redwoodjs/web";
// import { toast } from "@redwoodjs/web/toast";

import { Link, routes } from "@redwoodjs/router";
import type { FindStateById } from "types/graphql";

interface Props {
  state: NonNullable<FindStateById["state"]>;
}

const MiniState = ({ state }: Props) => {
  return (
    <Link to={routes.stateSelection()}>
      <button
        className={` w-24 h-12 relative flex items-center justify-center cursor-pointer shadow-lg hover:scale-95 transition-all`}
      >
        <img
          src={state.imageUrl}
          className=" w-full h-full object-cover absolute top-0 left-0 rounded"
        />
        <h1 className="relative font-anton uppercase text-lg text-white text-shadow shadow-gray-500">
          {state.abbreviation}
        </h1>
      </button>
    </Link>
  );
};

export default MiniState;
