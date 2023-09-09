import { build_request_url } from "./request";

export const getRepresentativesBatch = async (
  offset: number,
  limit: number,
) => {
  let request = build_request_url("https://api.congress.gov")
    .extend("v3")
    .extend("member")
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
};

export const getAllRepresentatives = async () => {
  const limit = 250;

  // const testQuery = await getRepresentativesBatch(0, 1)
  // const count = testQuery.pagination.count
  const count = 2515;
  const batches = Math.ceil(count / limit);

  const queries = [];
  for (let i = 0; i < batches; i++) {
    queries.push(getRepresentativesBatch(i * limit, limit));
  }

  const completedQueries = await Promise.all(queries);
  return completedQueries.map((query) => query.members).flat(1);
};

export const getStartYearAndChamber = (rep) => {
  const MAX_YEAR = 9999;
  let hit = { year: MAX_YEAR, chamber: null };
  for (const item of rep.terms.item) {
    if (!item.endYear) {
      if (item.startYear < hit.year) {
        hit = { year: item.startYear, chamber: item.chamber };
      }
    }
  }
  const inactive = hit.year === MAX_YEAR;
  return {
    inactive,
    startYear: inactive ? undefined : hit.year,
    chamber: inactive ? undefined : hit.chamber,
  };
};
