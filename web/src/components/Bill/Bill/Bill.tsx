import { FindBillById } from "types/graphql";
import { useCallback, useEffect, useMemo } from "react";
import { useState } from "react";
import { useRepresentativesContext } from "src/contexts/RepresentativesContext";
import { useMutation } from "@redwoodjs/web";
import { useUserContext } from "src/contexts/UserContext";

const cast_vote = gql`
  mutation CastVote($input: CreateVoteInput!) {
    createVote(input: $input) {
      id
    }
  }
`;

const update_vote = gql`
  mutation UpdateCastedVote($id: String!, $input: UpdateVoteInput!) {
    updateVote(id: $id, input: $input) {
      id
    }
  }
`;

interface Props {
  bill: NonNullable<FindBillById["bill"]>;
}

const Bill = ({ bill }: Props) => {
  const [castVote] = useMutation(cast_vote, {
    refetchQueries: ["FindBillById"],
  });
  const [updateVote] = useMutation(update_vote, {
    refetchQueries: ["FindBillById"],
  });

  const user = useUserContext();
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

  const myVote = useMemo(() => {
    const vote = getMyVote(bill, user.id);
    return vote;
  }, [bill, user]);

  const onVotePressed = useCallback(
    async (result) => {
      const found = bill.userVotes.find((vote) => vote.user.id === user.id);
      console.log({ found });
      if (found) {
        await updateVote({
          variables: {
            id: found.id,
            input: {
              result,
            },
          },
        });
      } else {
        await castVote({
          variables: {
            input: {
              result,
              userId: user.id,
              billId: bill.id,
            },
          },
        });
      }
    },
    [castVote, updateVote, bill, user],
  );

  return (
    <>
      <div className="animate-fade-in transition-all h-fit m-2 flex flex-row">
        <div className="bg-night bg-opacity-80 flex-1 p-2 shadow rounded-tl rounded-bl rounded-br">
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
                <div className="text-zinc-400 font-archivo mt-4">Sponsor</div>
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
                <div className="text-zinc-400 font-archivo mt-4">
                  Co-Sponsors
                </div>
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
                <div className="text-zinc-400 font-archivo mt-4">
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
        <div className="w-48 flex-shrink h-full flex flex-col justify-between">
          <div className="flex-1">
            <div className=" w-full h-12 rounded-tr font-archivo text-white flex items-center justify-center text-lg">
              Your Vote
            </div>
            <button
              onClick={() => onVotePressed("Yea")}
              className={`${
                myVote && myVote.result == "Yea"
                  ? "bg-green-800 bg-opacity-100"
                  : "bg-green-700 bg-opacity-10"
              } m-2 rounded w-full text-xl flex items-center justify-center text-green-500 border-8 border-green-700 p-4 font-archivo transition-all hover:scale-125 hover:bg-opacity-100 hover:bg-green-800 hover:rounded uppercase`}
            >
              <span className="material-icons mr-1">thumb_up</span> Yea
            </button>
            <button
              onClick={() => onVotePressed("Nay")}
              className={`${
                myVote && myVote.result == "Nay"
                  ? "bg-red-800 bg-opacity-100"
                  : "bg-red-700 bg-opacity-10"
              } m-2 rounded w-full text-xl flex items-center justify-center text-red-500 border-8 border-red-700 p-4 font-archivo transition-all hover:scale-125 hover:bg-opacity-100 hover:bg-red-800 hover:rounded uppercase`}
            >
              <span className="material-icons mr-1">thumb_down</span> Nay
            </button>
          </div>
          <div className="flex-1">
            <div className=" w-full h-12 rounded-tr font-archivo text-white flex items-center justify-center text-lg">
              Totals
            </div>
            <div className="w-full h-12 flex flex-row">
              <div className="border-b-8 border-green-700 m-2 flex-1 font-archivo text-white flex items-center justify-center text-xl">
                {bill.userVotes.reduce((count, vote) => {
                  return count + (vote.result == "Yea" ? 1 : 0);
                }, 0)}
              </div>
              <div className=" border-b-8 border-red-700 m-2 flex-1 font-archivo text-white flex items-center justify-center text-xl">
                {bill.userVotes.reduce((count, vote) => {
                  return count + (vote.result == "Nay" ? 1 : 0);
                }, 0)}
              </div>
            </div>
          </div>
        </div>
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

function getMyVote(bill, userId) {
  const found = bill.userVotes.find((vote) => vote.user.id === userId);

  return found;
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
