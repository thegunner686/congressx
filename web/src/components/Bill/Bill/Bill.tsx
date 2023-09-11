import { FindBillById } from "types/graphql";
import { useEffect, useMemo } from "react";
import { useState } from "react";
import { useRepresentativesContext } from "src/contexts/RepresentativesContext";

interface Props {
  bill: NonNullable<FindBillById["bill"]>;
}

const Bill = ({ bill }: Props) => {
  const representatives = useRepresentativesContext();

  const billStatus = useMemo(() => {
    return getBillStatus(bill);
  }, [bill]);

  const billSummary = useMemo(() => {
    return getBillSummary(bill);
  }, [bill]);

  const representativeVotes = useMemo(() => {
    const votes = getRepresentativeVotes(bill, representatives);
    return votes;
  }, [bill, representatives]);

  const billSponsors = useMemo(() => {
    const sponsors = getBillSponsors(bill);
    return sponsors;
  }, [bill]);

  const billCosponsors = useMemo(() => {
    const cosponsors = getBillCosponsors(bill);
    return cosponsors;
  }, [bill]);

  return (
    <>
      <div className="animate-fade-in transition-all h-fit m-2 flex flex-row">
        <div className="bg-night bg-opacity-80 flex-1 p-2 shadow rounded">
          <div className="w-full flex flex-row text-white font-archivo items-center justify-start">
            <div className="text-zinc-400 font-archivo text-xs">
              Bill {bill.number}
            </div>
            <span className="material-icons text-[6px] mx-2">
              fiber_manual_record
            </span>
            <div className="text-zinc-400 font-archivo text-xs">
              {bill.type == "s" ? "Senate" : "House of Representatives"}
            </div>
            <span className="material-icons text-[6px] mx-2">
              fiber_manual_record
            </span>
            <div
              className={`font-archivo text-xs p-1 rounded-sm ${
                billStatus === "Undecided"
                  ? "bg-zinc-800 text-zinc-500"
                  : billStatus === "Passed"
                  ? "bg-green-800 text-green-500"
                  : "bg-red-800 text-red-500"
              }`}
            >
              {billStatus}
            </div>
          </div>
          <div className="w-full p-2">
            <div className="font-archivo text-lg text-white">{bill.title}</div>
            {billSummary != null && (
              <div className=" bg-sky-950 p-2 rounded text-sky-100 font-archivo text-xs">
                {billSummary}
              </div>
            )}
            {billSponsors != null && billSponsors.length > 0 && (
              <>
                <div className="text-zinc-400 font-archivo">Sponsors</div>
                {billSponsors.map((representative) => {
                  return (
                    <div
                      key={representative.id}
                      className="flex flex-row w-full rounded bg-green-950 m-1 my-2"
                    >
                      <img
                        src={representative.imageUrl}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="font-archivo text-white p-1 flex-grow">
                        {representative.directOrderName}
                        <div>
                          {representative.state.name}
                          <span className="text-xs text-zinc-400 mx-2">
                            {representative.partyHistory[0]?.partyName}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {billCosponsors != null && billCosponsors.length > 0 && (
              <>
                <div className="text-zinc-400 font-archivo">Co-Sponsors</div>
                {billCosponsors.map((representative) => {
                  return (
                    <div
                      key={representative.id}
                      className="flex flex-row w-full rounded bg-green-950 m-1 my-2"
                    >
                      <img
                        src={representative.imageUrl}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="font-archivo text-white p-1 flex-grow">
                        {representative.directOrderName}
                        <div>
                          {representative.state.name}
                          <span className="text-xs text-zinc-400 mx-2">
                            {representative.partyHistory[0]?.partyName}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
            {representativeVotes != null && representativeVotes.length > 0 && (
              <>
                {" "}
                <div className="text-zinc-400 font-archivo">
                  How your Representatives voted
                </div>
                {representativeVotes.map((vote) => {
                  const { representative } = vote;
                  return (
                    <div
                      key={vote.id}
                      className="flex flex-row w-full rounded bg-green-950 m-1 my-2"
                    >
                      <img
                        src={representative.imageUrl}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="font-archivo text-white p-1 flex-grow">
                        {representative.directOrderName}
                        <div>
                          {representative.state.name}
                          <span className="text-xs text-zinc-400 mx-2">
                            {representative.partyHistory[0]?.partyName}{" "}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center p-2">
                        <div
                          className={`font-archivo text-base p-2 px-4 rounded-sm ${
                            vote.result === "Yea"
                              ? "bg-green-800 text-green-500"
                              : vote.result === "Nay"
                              ? "bg-red-800 text-red-500"
                              : "bg-zinc-800 text-zinc-500"
                          }`}
                        >
                          {vote.result}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
        <div className="w-48 flex-shrink h-full"></div>
      </div>
    </>
  );
};

function getBillStatus(bill) {
  if (bill.votings && bill.votings.length > 0) {
    return bill.votings[0].status?.includes("Passed") ? "Passed" : "Rejected";
  } else {
    return "Undecided";
  }
}

function getBillSummary(bill) {
  if (bill.summaries) {
    if (bill.summaries[0]?.text) {
      return bill.summaries[0]?.text;
    }
  }
  return null;
}

function getBillSponsors(bill) {
  return bill.sponsors ?? [];
}

function getBillCosponsors(bill) {
  return bill.cosponsors ?? [];
}

function getRepresentativeVotes(bill, representatives) {
  if (bill.votings && bill.votings.length > 0) {
    let myVotes = [];
    for (const voting of bill.votings) {
      const repIds = representatives.map((r) => r.id);
      const { votes } = voting;
      const repVotes = votes.filter((vote) =>
        repIds.includes(vote.representative.id),
      );
      myVotes = [...myVotes, ...repVotes];
    }
    return myVotes;
  }
  return [];
}

export default Bill;
