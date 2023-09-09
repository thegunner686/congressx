import type { Voting } from "@prisma/client";

import {
  votings,
  voting,
  createVoting,
  updateVoting,
  deleteVoting,
} from "./votings";
import type { StandardScenario } from "./votings.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("votings", () => {
  scenario("returns all votings", async (scenario: StandardScenario) => {
    const result = await votings();

    expect(result.length).toEqual(Object.keys(scenario.voting).length);
  });

  scenario("returns a single voting", async (scenario: StandardScenario) => {
    const result = await voting({ id: scenario.voting.one.id });

    expect(result).toEqual(scenario.voting.one);
  });

  scenario("creates a voting", async (scenario: StandardScenario) => {
    const result = await createVoting({
      input: {
        id: "String",
        billId: scenario.voting.two.billId,
        congress: 7784675,
        session: "String",
        rollCallNumber: 4460505,
        status: "String",
        type: "String",
      },
    });

    expect(result.id).toEqual("String");
    expect(result.billId).toEqual(scenario.voting.two.billId);
    expect(result.congress).toEqual(7784675);
    expect(result.session).toEqual("String");
    expect(result.rollCallNumber).toEqual(4460505);
    expect(result.status).toEqual("String");
    expect(result.type).toEqual("String");
  });

  scenario("updates a voting", async (scenario: StandardScenario) => {
    const original = (await voting({ id: scenario.voting.one.id })) as Voting;
    const result = await updateVoting({
      id: original.id,
      input: { id: "String2" },
    });

    expect(result.id).toEqual("String2");
  });

  scenario("deletes a voting", async (scenario: StandardScenario) => {
    const original = (await deleteVoting({
      id: scenario.voting.one.id,
    })) as Voting;
    const result = await voting({ id: original.id });

    expect(result).toEqual(null);
  });
});
