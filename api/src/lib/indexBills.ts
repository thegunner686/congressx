import {
  build_congress_request,
  build_request_url,
  fetch_congress_api,
} from "./request";
import fs from "fs";
import { db } from "./db";

const BILL_TYPE = "s";
const CONGRESS = 118;

const api_keys = [
  "IRV6GaufikQLxuZPPbnsMDHxyFR0QMTxrz8Y6ugq",
  "BYszIFHp9HGkYz7Um00mqj2gud7pB50wa4Md7wmU",
  "L74pRe2dLjuqg38rKhM4H8eEwt45PgDbIos157XS",
  "wOjFb6EHJs043cH6lWfC7BU7aNinNJUh6tfLDNgn",
  "387cm9dwEfQSgdsG131cc7MWKpg2UHFaPzm7lu9Q",
  "dliRQwEihoX0g8piKVUxWSwyrhLxsQHdSYF4unig",
  "jtgLDGVFnXU92OXsx47F1tfQt838t0UhlcWHl9IA",
  "PHYPEnkg5N0xgomgSE8nCnizY83EpJ5JEF0C5uzA",
  "99UbLMsUJ8hdYMcx98c7CGUwciBCexhT9JgeuKbD",
  "KkTINovzqeNWsGY8gobqgjpdzgiIegMBLLAxO14U",
];

export async function getBillsBatch(offset = 0, limit = 250) {
  let request = build_request_url("https://api.congress.gov")
    .extend("v3")
    .extend("bill")
    .extend(CONGRESS)
    .extend(BILL_TYPE)
    .query_param("format", "json");
  if (offset > 0) {
    request = request.query_param("offset", offset);
  }
  request = request.query_param("limit", limit);

  const url = request.done();

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Api-Key": process.env.CONGRESS_API_KEY,
    },
  });

  const json = await response.json();

  return json;
}

export const getAllBills = async () => {
  const limit = 250;

  // const testQuery = await getRepresentativesBatch(0, 1)
  // const count = testQuery.pagination.count
  const count = 2000;
  const batches = Math.ceil(count / limit);

  const queries = [];
  for (let i = 0; i < batches; i++) {
    queries.push(getBillsBatch(i * limit, limit));
  }

  const completedQueries = await Promise.all(queries);
  return completedQueries.map((query) => query.bills).flat(1);
};

export async function indexAllBills() {
  const bills = await getAllBills();

  console.log({ length: bills.length });

  // Intentionally making things slow to reduce connections to db
  // max connections is 9
  for (let i = 0; i < bills.length; i++) {
    const api_key = api_keys[i % api_keys.length];
    const bill = bills[i];
    console.log(`Indexing (${i}) Bill ${bill.number}`);
    await indexBill(bill, api_key);
  }
}

export async function indexBill(_bill, api_key?) {
  const request = build_congress_request()
    .extend("bill")
    .extend(CONGRESS)
    .extend(BILL_TYPE)
    .extend(_bill.number);

  const { bill } = await fetch_congress_api(request, api_key);

  const billId = `${bill.congress}-${bill.type}-${bill.number}`.toLowerCase();
  const { title, originChamber } = bill;

  const cosponsors = await getBillCosponsors(
    bill.congress,
    bill.type,
    bill.number,
    api_key,
  );
  const subjects = await getBillSubjects(
    bill.congress,
    bill.type,
    bill.number,
    api_key,
  );
  const summaries = await getBillSummaries(
    bill.congress,
    bill.type,
    bill.number,
    api_key,
  );

  await db.bill.create({
    data: {
      id: billId,
      title,
      introducedDate: new Date(bill.introducedDate),
      congressNumber: bill.congress,
      originChamber,
      type: bill.type.toLowerCase(),
      number: parseInt(bill.number),
      sponsors: {
        connect: await getConnectedRepresentatives(
          bill.sponsors.map((sponsor) => ({ id: sponsor.bioguideId })),
        ),
      },
      cosponsors: {
        connect: await getConnectedRepresentatives(
          cosponsors.map((sponsor) => ({ id: sponsor.bioguideId })),
        ),
      },
      legislativeSubjects: {
        connectOrCreate: subjects.map((subject) => ({
          where: { id: subject.name },
          create: { id: subject.name, name: subject.name, type: subject.type },
        })),
      },
      summaries: {
        create: summaries.map((summary) => ({
          actionDate: new Date(summary.actionDate),
          actionDescription: summary.actionDesc,
          text: summary.text,
          updateDate: new Date(summary.updateDate),
        })),
      },
    },
  });

  await indexBillActions(
    bill.congress,
    bill.type,
    bill.number,
    billId,
    api_key,
  );
}

async function getConnectedRepresentatives(reps) {
  const validReps = [];
  for (const { id } of reps) {
    const exists = await db.representative.findUnique({
      where: {
        id,
      },
    });
    if (exists) validReps.push({ id });
  }
  return validReps;
}

async function getBillSubjects(congress, type, number, api_key) {
  const request = build_congress_request()
    .extend("bill")
    .extend(congress)
    .extend(type)
    .extend(number)
    .extend("subjects");

  const { subjects } = await fetch_congress_api(request, api_key);

  const validSubjects = subjects.legislativeSubjects.map((subject) => ({
    ...subject,
    type: "Legislative Subject",
  }));

  if (subjects.policyArea && subjects.policyArea.name) {
    validSubjects.push({
      ...subjects.policyArea,
      type: "Policy Area",
    });
  }
  return validSubjects;
}

async function getBillCosponsors(congress, type, number, api_key) {
  const request = build_congress_request()
    .extend("bill")
    .extend(congress)
    .extend(type)
    .extend(number)
    .extend("cosponsors");

  const { cosponsors } = await fetch_congress_api(request, api_key);

  return cosponsors;
}

export async function indexBillActions(
  congress,
  type,
  number,
  billId,
  api_key,
) {
  const request = build_congress_request()
    .extend("bill")
    .extend(congress)
    .extend(type)
    .extend(number)
    .extend("actions")
    .query_param("limit", 5);

  const { actions } = await fetch_congress_api(request, api_key);
  for (const action of actions) {
    const { actionCode, actionDate, text, type: actionType } = action;
    const billAction = {
      code: actionCode,
      date: new Date(actionDate),
      text,
      type: actionType,
      billId,
    };

    await db.billAction.create({
      data: billAction,
    });
  }
}

export async function getBillSummaries(congress, type, number, api_key) {
  const request = build_congress_request()
    .extend("bill")
    .extend(congress)
    .extend(type)
    .extend(number)
    .extend("summaries")
    .query_param("limit", 2);

  const { summaries } = await fetch_congress_api(request, api_key);

  return summaries;
}

export async function indexVoting() {
  const files = fs.readdirSync(
    "/Users/gunnerspencer/congress/data/118/votes/2023",
  );

  for (const file of files) {
    const json = fs.readFileSync(
      `/Users/gunnerspencer/congress/data/118/votes/2023/${file}/data.json`,
      { encoding: "utf8", flag: "r" },
    );
    const clean = await cleanAndLinkVoting(JSON.parse(json));
    if (!clean) continue;
    console.log(`Indexed ${file}`);
  }
}

const chamberMap = { s: "Senate", h: "House of Representatives" };

export async function cleanAndLinkVoting(_voting) {
  if (_voting.category !== "passage") return undefined;
  if (_voting.bill === undefined) return undefined;
  if (!["hr", "s"].includes(_voting.bill.type)) return undefined;
  if (_voting.amendment !== undefined) return undefined;
  const { bill } = _voting;
  const billId = `${bill.congress}-${bill.type}-${bill.number}`.toLowerCase();
  const voting = {
    id: _voting.vote_id,
    billId,
    congress: _voting.congress,
    session: _voting.session,
    rollCallNumber: _voting.number,
    status: _voting.result,
    type: _voting.category,
    chamber: chamberMap[_voting.chamber],
  };

  await db.voting.create({
    data: voting,
  });

  for (const resultKey of Object.keys(_voting.votes)) {
    for (const vote of _voting.votes[resultKey]) {
      await indexRepresentativeVote(vote, resultKey, voting.id);
    }
  }
}

const partyMap = {
  R: "Republican",
  D: "Democratic",
  I: "Independent",
};

export async function indexRepresentativeVote(vote, result, votingId) {
  const { first_name, last_name, display_name, state, party } = vote;
  const cleanedDisplayName = display_name.split(" ")[0].replace(",", "");
  let representative;
  if (first_name != null && last_name !== null) {
    representative = await db.representative.findFirst({
      where: {
        OR: [
          {
            AND: [
              {
                lastName: {
                  contains: last_name,
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: first_name,
                  mode: "insensitive",
                },
              },
              { stateId: state.toUpperCase() },
            ],
          },
          {
            AND: [
              {
                lastName: {
                  contains: last_name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                  mode: "insensitive",
                },
              },
              {
                firstName: {
                  contains: first_name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                  mode: "insensitive",
                },
              },
              { stateId: state.toUpperCase() },
            ],
          },
        ],
      },
    });
  } else {
    representative = await db.representative.findFirst({
      where: {
        OR: [
          {
            AND: [
              {
                lastName: {
                  contains: cleanedDisplayName,
                  mode: "insensitive",
                },
              },
              { stateId: state.toUpperCase() },
              {
                partyHistory: {
                  some: {
                    partyName: partyMap[vote.party] ?? "",
                  },
                },
              },
            ],
          },
          {
            AND: [
              {
                lastName: {
                  contains: cleanedDisplayName
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, ""),
                  mode: "insensitive",
                },
              },
              { stateId: state.toUpperCase() },
              {
                partyHistory: {
                  some: {
                    partyName: partyMap[vote.party] ?? "",
                  },
                },
              },
            ],
          },
        ],
      },
    });
  }
  // console.log(representative);
  if (!representative) {
    console.log(
      `MISSING (${display_name}) ${first_name}-${last_name} (${state})`,
    );
    return;
  }
  console.log(
    `vote ID: ${votingId}-${representative.id} (${display_name}) ${first_name} ${last_name} (${state}) mapped to ${representative.directOrderName}`,
  );
  const representativeVote = {
    id: `${votingId}-${representative.id}`,
    votingId,
    representativeId: representative.id,
    result,
  };

  try {
    await db.representativeVote.create({
      data: representativeVote,
    });
  } catch (error) {
    console.log(
      `______CAUGHT ERROR: indexing representative vote, ${display_name}`,
    );
    // console.log(error);
  }
}
