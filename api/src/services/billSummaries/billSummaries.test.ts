import type { BillSummary } from "@prisma/client";

import {
  billSummaries,
  billSummary,
  createBillSummary,
  updateBillSummary,
  deleteBillSummary,
} from "./billSummaries";
import type { StandardScenario } from "./billSummaries.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("billSummaries", () => {
  scenario("returns all billSummaries", async (scenario: StandardScenario) => {
    const result = await billSummaries();

    expect(result.length).toEqual(Object.keys(scenario.billSummary).length);
  });

  scenario(
    "returns a single billSummary",
    async (scenario: StandardScenario) => {
      const result = await billSummary({ id: scenario.billSummary.one.id });

      expect(result).toEqual(scenario.billSummary.one);
    },
  );

  scenario("creates a billSummary", async (scenario: StandardScenario) => {
    const result = await createBillSummary({
      input: {
        billId: scenario.billSummary.two.billId,
        actionDate: "2023-09-04T16:15:18.929Z",
        actionDescription: "String",
        text: "String",
        updateDate: "2023-09-04T16:15:18.929Z",
      },
    });

    expect(result.billId).toEqual(scenario.billSummary.two.billId);
    expect(result.actionDate).toEqual(new Date("2023-09-04T16:15:18.929Z"));
    expect(result.actionDescription).toEqual("String");
    expect(result.text).toEqual("String");
    expect(result.updateDate).toEqual(new Date("2023-09-04T16:15:18.929Z"));
  });

  scenario("updates a billSummary", async (scenario: StandardScenario) => {
    const original = (await billSummary({
      id: scenario.billSummary.one.id,
    })) as BillSummary;
    const result = await updateBillSummary({
      id: original.id,
      input: { actionDate: "2023-09-05T16:15:18.929Z" },
    });

    expect(result.actionDate).toEqual(new Date("2023-09-05T16:15:18.929Z"));
  });

  scenario("deletes a billSummary", async (scenario: StandardScenario) => {
    const original = (await deleteBillSummary({
      id: scenario.billSummary.one.id,
    })) as BillSummary;
    const result = await billSummary({ id: original.id });

    expect(result).toEqual(null);
  });
});
