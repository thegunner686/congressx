import { Link, routes, navigate } from "@redwoodjs/router";
import { useMutation } from "@redwoodjs/web";
import { toast } from "@redwoodjs/web/toast";
import { useMemo } from "react";

import type { FindRepresentativeById } from "types/graphql";

interface Props {
  representative: NonNullable<FindRepresentativeById["representative"]>;
}

const Representative = ({ representative }: Props) => {
  const {
    imageUrl,
    directOrderName,
    partyHistory,
    terms,
    district,
    leadership,
  } = representative;

  const party = useMemo(() => {
    return getCurrentParty(partyHistory);
  }, [partyHistory]);

  const termInfo = useMemo(() => {
    return getTermInfo(terms);
  }, [terms]);

  const currentLeadership = useMemo(() => {
    if (leadership.length == 0) return undefined;
    return [...leadership].sort(
      (l1, l2) => l2.congressNumber - l1.congressNumber,
    )[0];
  }, [leadership]);

  return (
    <div className="bg-emerald-950 bg-opacity-70 rounded w-11/12 h-fit shadow my-2 flex flex-row hover:scale-95 hover:bg-emerald-900 hover:bg-opacity-90 animate-fade-in transition-all cursor-pointer">
      <div>
        <img
          src={imageUrl}
          className=" object-cover h-full w-32 object-top rounded-tl rounded-bl"
        />
      </div>
      <div className="p-2 flex-grow flex flex-col">
        <div className="font-archivo flex-row flex items-center mb-1">
          <div className="text-white font-archivo text-2xl">
            {directOrderName}
          </div>
          <div className="text-gray-300 flex-grow ml-2">{party}</div>
        </div>
        <div
          className={`rounded p-1 px-4 font-archivo flex flex-row items-center max-w-fit ${
            termInfo.latest?.chamber == "Senate"
              ? "bg-amber-700 text-amber-950"
              : "bg-cyan-700 text-cyan-950"
          }`}
        >
          {termInfo.latest?.chamber}
          {district ? (
            <>
              <span className="material-icons text-[6px] mx-2">
                fiber_manual_record
              </span>
              District {district.number}
            </>
          ) : null}
        </div>
        <div className="font-archivo pt-2 flex flex-row justify-start mt-1">
          <div className="flex flex-col items-start justify-center pr-8">
            <div className="text-sm text-zinc-300">Born</div>
            <div className="text-xl text-zinc-200">
              {representative.birthYear}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pr-8">
            <div className="text-sm text-zinc-300">Serving Since</div>
            <div className="text-xl text-zinc-200">
              {termInfo.oldest.startYear}
            </div>
          </div>
          <div className="flex flex-col items-start justify-center pr-8">
            <div className="text-sm text-zinc-300">
              Total Leadership Positions
            </div>
            <div className="text-xl text-zinc-200">
              {representative.leadership.length}
            </div>
          </div>
        </div>
        {currentLeadership != null && (
          <div className="flex flex-col items-start justify-center pr-8 font-archivo mt-2">
            <div className="text-sm text-zinc-300">
              Current Leadership Position
            </div>
            <div className="text-xl text-zinc-200">
              {currentLeadership.type}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function getCurrentParty(partyHistory) {
  if (partyHistory == null || partyHistory.length == 0) {
    return "No Party Affiliation";
  }
  return [...partyHistory].sort((p1, p2) => p1.startYear - p2.startYear)[0]
    .party.name;
}

function getTermInfo(terms) {
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
