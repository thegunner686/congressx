import type { Leadership } from "@prisma/client";

import {
  leaderships,
  leadership,
  createLeadership,
  updateLeadership,
  deleteLeadership,
} from "./leaderships";
import type { StandardScenario } from "./leaderships.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("leaderships", () => {
  scenario("returns all leaderships", async (scenario: StandardScenario) => {
    const result = await leaderships();

    expect(result.length).toEqual(Object.keys(scenario.leadership).length);
  });

  scenario(
    "returns a single leadership",
    async (scenario: StandardScenario) => {
      const result = await leadership({ id: scenario.leadership.one.id });

      expect(result).toEqual(scenario.leadership.one);
    },
  );

  scenario("creates a leadership", async (scenario: StandardScenario) => {
    const result = await createLeadership({
      input: {
        representativeId: scenario.leadership.two.representativeId,
        congressNumber: scenario.leadership.two.congressNumber,
        type: "String",
      },
    });

    expect(result.representativeId).toEqual(
      scenario.leadership.two.representativeId,
    );
    expect(result.congressNumber).toEqual(
      scenario.leadership.two.congressNumber,
    );
    expect(result.type).toEqual("String");
  });

  scenario("updates a leadership", async (scenario: StandardScenario) => {
    const original = (await leadership({
      id: scenario.leadership.one.id,
    })) as Leadership;
    const result = await updateLeadership({
      id: original.id,
      input: { type: "String2" },
    });

    expect(result.type).toEqual("String2");
  });

  scenario("deletes a leadership", async (scenario: StandardScenario) => {
    const original = (await deleteLeadership({
      id: scenario.leadership.one.id,
    })) as Leadership;
    const result = await leadership({ id: original.id });

    expect(result).toEqual(null);
  });
});
