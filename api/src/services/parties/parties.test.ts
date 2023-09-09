import type { Party } from "@prisma/client";

import {
  parties,
  party,
  createParty,
  updateParty,
  deleteParty,
} from "./parties";
import type { StandardScenario } from "./parties.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("parties", () => {
  scenario("returns all parties", async (scenario: StandardScenario) => {
    const result = await parties();

    expect(result.length).toEqual(Object.keys(scenario.party).length);
  });

  scenario("returns a single party", async (scenario: StandardScenario) => {
    const result = await party({ id: scenario.party.one.id });

    expect(result).toEqual(scenario.party.one);
  });

  scenario("creates a party", async () => {
    const result = await createParty({
      input: { name: "String", abbreviation: "String" },
    });

    expect(result.name).toEqual("String");
    expect(result.abbreviation).toEqual("String");
  });

  scenario("updates a party", async (scenario: StandardScenario) => {
    const original = (await party({ id: scenario.party.one.id })) as Party;
    const result = await updateParty({
      id: original.id,
      input: { name: "String2" },
    });

    expect(result.name).toEqual("String2");
  });

  scenario("deletes a party", async (scenario: StandardScenario) => {
    const original = (await deleteParty({
      id: scenario.party.one.id,
    })) as Party;
    const result = await party({ id: original.id });

    expect(result).toEqual(null);
  });
});
