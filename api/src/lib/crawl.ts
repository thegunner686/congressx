import { build_congress_request, fetch_congress_api } from "./request";
import { getAllRepresentatives, getStartYearAndChamber } from "./congress-api";
import { db } from "./db";

export async function indexAllRepresentatives() {
  const reps = await getAllRepresentatives();

  // indexing specific rep
  const found = reps.filter((rep) => rep.name.includes("Cicilline"));
  if (found[0]) {
    console.log(`Indexing ${found[0].name}`);
    await indexRepresentative(found[0]);
  }
  // console.log({ length: reps.length });

  // Intentionally making things slow to reduce connections to db
  // max connections is 9
  // for (let i = 0; i < reps.length; i++) {
  //   const rep = reps[i];
  //   // const { inactive } = getStartYearAndChamber(rep);
  //   if (rep.name.includes("Cicilline")) {
  //     console.log(rep)
  //     break;
  //     // console.log(`Indexing ${i}`);
  //     // await indexRepresentative(rep);
  //     // break;
  //   }
  // }
}

async function indexRepresentative(representative) {
  const { bioguideId, ...rep } = representative;

  const found = await db.representative.findUnique({
    where: {
      id: bioguideId,
    },
  });

  if (found) return;

  const request = build_congress_request().extend("member").extend(bioguideId);

  const { member } = await fetch_congress_api(request);

  if (!member) {
    return;
  }

  const stateCodes = [];

  if (member.terms && Array.isArray(member.terms) && member.terms.length > 0) {
    member.terms
      .filter((term) => term.stateName === member.state)
      .forEach((t) => stateCodes.push(t.stateCode));
  }

  const { inactive } = getStartYearAndChamber(rep);

  const toWrite = {
    birthYear: member.birthYear ? parseInt(member.birthYear) : null,
    imageUrl: member.depiction ? member.depiction.imageUrl : null,
    directOrderName: member.directOrderName,
    firstName: member.firstName,
    lastName: member.lastName,
    honorificName: member.honorificName,
    invertedOrderName: member.invertedOrderName,
    active: !inactive,
    stateId: stateCodes.length > 0 ? stateCodes[0] : null,
  };

  // Create Representative
  const createRepresentative = db.representative.upsert({
    where: {
      id: bioguideId,
    },
    update: toWrite,
    create: {
      id: bioguideId,
      ...toWrite,
    },
  });

  await createRepresentative;

  await indexLeadership(bioguideId, member.leadership ?? []);
  await indexPartyHistory(bioguideId, member.partyHistory ?? []);
  await indexTerms(bioguideId, member.terms ?? []);
  if (member.district) {
    await indexDistrict(
      bioguideId,
      member.district,
      member.state,
      member.terms ?? [],
    );
  }
}

async function indexDistrict(
  representativeId,
  districtNumber,
  stateName,
  terms,
) {
  if (districtNumber === null || districtNumber === undefined) return;

  const stateCode = terms
    .filter((term) => term.stateName === stateName)
    .map((t) => t.stateCode)[0];

  return db.district.upsert({
    where: {
      stateId_number: {
        stateId: stateCode,
        number: districtNumber,
      },
    },
    update: {
      representativeId,
    },
    create: {
      stateId: stateCode,
      number: districtNumber,
      representativeId,
    },
  });
}

async function indexLeadership(representativeId, leadership) {
  if (!leadership) return;
  for (const item of leadership) {
    await db.leadership.create({
      data: {
        representativeId,
        congressNumber: item.congress,
        type: item.type,
      },
    });
  }
}

async function indexPartyHistory(representativeId, partyHistory) {
  if (!partyHistory) return;
  for (const item of partyHistory) {
    await indexParty(item);

    await db.partyAffiliation.upsert({
      where: {
        representativeId_partyName_startYear: {
          representativeId,
          partyName: item.partyName,
          startYear: item.startYear,
        },
      },
      update: {},
      create: {
        representativeId,
        partyName: item.partyName,
        startYear: item.startYear,
      },
    });
  }
}

async function indexParty(data) {
  return db.party.upsert({
    where: {
      name: data.partyName,
    },
    update: {},
    create: {
      name: data.partyName,
      abbreviation: data.partyAbbreviation,
    },
  });
}

async function indexTerms(representativeId, terms) {
  if (!terms) return;
  const unique_states = [];
  const states = terms.filter((item) => {
    const includes = unique_states.includes(item.stateCode);
    if (!includes) unique_states.push(item.stateCode);
    return !includes;
  });

  for (const state of states) {
    await indexState(state);
  }

  for (const item of terms) {
    await indexState(item);
    await indexCongress(item.congress);
    await db.term.create({
      data: {
        chamber: item.chamber,
        congressNumber: parseInt(item.congress),
        startYear: parseInt(item.startYear),
        endYear: item.endYear ? parseInt(item.endYear) : null,
        memberType: item.memberType,
        stateId: item.stateCode,
        representativeId,
      },
    });
  }
}

async function indexState(data) {
  const found = await db.state.findUnique({
    where: {
      id: data.stateCode,
    },
  });

  if (found) return;

  return db.state.upsert({
    where: {
      id: data.stateCode,
    },
    update: {},
    create: {
      id: data.stateCode,
      name: data.stateName,
      imageUrl: "",
    },
  });
}

async function indexCongress(congressNumber) {
  const found = await db.congress.findUnique({
    where: {
      number: congressNumber,
    },
  });

  if (found) return;

  const congressRequest = build_congress_request()
    .extend("congress")
    .extend(congressNumber);

  const { congress } = await fetch_congress_api(congressRequest);

  await db.congress.create({
    data: {
      number: parseInt(congressNumber),
      name: congress.name,
      startYear: congress.startYear ? parseInt(congress.startYear) : null,
      endYear: congress.endYear ? parseInt(congress.endYear) : null,
    },
  });
  await indexSessions(congressNumber, congress.sessions ?? []);
}

async function indexSessions(congressNumber, sessions) {
  if (!sessions) return;
  for (const session of sessions) {
    await db.session.create({
      data: {
        chamber: session.chamber,
        startDate: session.startDate ? new Date(session.startDate) : null,
        endDate: session.endDate ? new Date(session.endDate) : null,
        type: session.type,
        number: parseInt(session.number),
        congress: {
          connect: {
            number: congressNumber,
          },
        },
      },
    });
  }
}
