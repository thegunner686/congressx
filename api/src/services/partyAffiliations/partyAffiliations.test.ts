import type { PartyAffiliation } from "@prisma/client";

import {
  partyAffiliations,
  partyAffiliation,
  createPartyAffiliation,
  updatePartyAffiliation,
  deletePartyAffiliation,
} from "./partyAffiliations";
import type { StandardScenario } from "./partyAffiliations.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("partyAffiliations", () => {
  scenario(
    "returns all partyAffiliations",
    async (scenario: StandardScenario) => {
      const result = await partyAffiliations();

      expect(result.length).toEqual(
        Object.keys(scenario.partyAffiliation).length,
      );
    },
  );

  scenario(
    "returns a single partyAffiliation",
    async (scenario: StandardScenario) => {
      const result = await partyAffiliation({
        id: scenario.partyAffiliation.one.id,
      });

      expect(result).toEqual(scenario.partyAffiliation.one);
    },
  );

  scenario("creates a partyAffiliation", async (scenario: StandardScenario) => {
    const result = await createPartyAffiliation({
      input: {
        representativeId: scenario.partyAffiliation.two.representativeId,
        partyName: scenario.partyAffiliation.two.partyName,
      },
    });

    expect(result.representativeId).toEqual(
      scenario.partyAffiliation.two.representativeId,
    );
    expect(result.partyName).toEqual(scenario.partyAffiliation.two.partyName);
  });

  scenario("updates a partyAffiliation", async (scenario: StandardScenario) => {
    const original = (await partyAffiliation({
      id: scenario.partyAffiliation.one.id,
    })) as PartyAffiliation;
    const result = await updatePartyAffiliation({
      id: original.id,
      input: {
        representativeId: scenario.partyAffiliation.two.representativeId,
      },
    });

    expect(result.representativeId).toEqual(
      scenario.partyAffiliation.two.representativeId,
    );
  });

  scenario("deletes a partyAffiliation", async (scenario: StandardScenario) => {
    const original = (await deletePartyAffiliation({
      id: scenario.partyAffiliation.one.id,
    })) as PartyAffiliation;
    const result = await partyAffiliation({ id: original.id });

    expect(result).toEqual(null);
  });
});
