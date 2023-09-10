import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";
import { useMemo } from "react";

import type { FindRepresentativeById } from "types/graphql";

interface Props {
  representative: NonNullable<FindRepresentativeById["representative"]>;
}

const Representative = ({ representative }: Props) => {
  const { imageUrl, directOrderName, partyHistory, terms, district } =
    representative;

  const party = useMemo(() => {
    return getCurrentParty(partyHistory);
  }, [partyHistory]);

  const currentTerm = useMemo(() => {
    return getCurrentTerm(terms);
  }, [terms]);

  return (
    <div className="bg-emerald-950 bg-opacity-50 rounded w-11/12 h-24 shadow my-2 flex flex-row hover:scale-95 hover:bg-emerald-900 transition-all cursor-pointer">
      <div>
        <img
          src={imageUrl}
          className=" object-cover h-24 w-24 rounded-tl rounded-bl"
        />
      </div>
      <div className="p-2 flex-grow flex flex-col">
        <div className="font-archivo flex-row flex items-end">
          <div className="text-white font-archivo text-lg">
            {directOrderName}
          </div>
          <div className="text-gray-500 flex-grow ml-2">{party}</div>
        </div>
        <div
          className={`rounded p-1 px-4 font-archivo flex flex-row items-center max-w-fit ${
            currentTerm.latest?.chamber == "Senate"
              ? "bg-amber-700 text-amber-950"
              : "bg-cyan-700 text-cyan-950"
          }`}
        >
          {currentTerm.latest?.chamber}
          {district ? (
            <>
              <span className="material-icons text-xs mx-2">
                fiber_manual_record
              </span>
              District {district.number}
            </>
          ) : null}
          <span className="material-icons text-xs mx-2">
            fiber_manual_record
          </span>
          since {currentTerm.oldest?.startYear}
        </div>
      </div>
    </div>
  );
};

function getCurrentParty(partyHistory) {
  if (partyHistory == null || partyHistory.length == 0) {
    return "No Party Affiliation";
  }
  return partyHistory.sort((p1, p2) => p1.startYear - p2.startYear)[0].party
    .name;
}

function getCurrentTerm(terms) {
  if (terms == null || terms.length == 0) {
    return {};
  }
  const sortedTerms = [...terms].sort((t1, t2) => t2.startYear - t1.startYear);
  return {
    latest: sortedTerms[0],
    oldest: sortedTerms[sortedTerms.length - 1],
  };
}

export default Representative;
