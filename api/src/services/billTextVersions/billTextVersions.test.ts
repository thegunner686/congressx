import type { BillTextVersion } from "@prisma/client";

import {
  billTextVersions,
  billTextVersion,
  createBillTextVersion,
  updateBillTextVersion,
  deleteBillTextVersion,
} from "./billTextVersions";
import type { StandardScenario } from "./billTextVersions.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("billTextVersions", () => {
  scenario(
    "returns all billTextVersions",
    async (scenario: StandardScenario) => {
      const result = await billTextVersions();

      expect(result.length).toEqual(
        Object.keys(scenario.billTextVersion).length,
      );
    },
  );

  scenario(
    "returns a single billTextVersion",
    async (scenario: StandardScenario) => {
      const result = await billTextVersion({
        id: scenario.billTextVersion.one.id,
      });

      expect(result).toEqual(scenario.billTextVersion.one);
    },
  );

  scenario("creates a billTextVersion", async (scenario: StandardScenario) => {
    const result = await createBillTextVersion({
      input: { billId: scenario.billTextVersion.two.billId },
    });

    expect(result.billId).toEqual(scenario.billTextVersion.two.billId);
  });

  scenario("updates a billTextVersion", async (scenario: StandardScenario) => {
    const original = (await billTextVersion({
      id: scenario.billTextVersion.one.id,
    })) as BillTextVersion;
    const result = await updateBillTextVersion({
      id: original.id,
      input: { billId: scenario.billTextVersion.two.billId },
    });

    expect(result.billId).toEqual(scenario.billTextVersion.two.billId);
  });

  scenario("deletes a billTextVersion", async (scenario: StandardScenario) => {
    const original = (await deleteBillTextVersion({
      id: scenario.billTextVersion.one.id,
    })) as BillTextVersion;
    const result = await billTextVersion({ id: original.id });

    expect(result).toEqual(null);
  });
});
