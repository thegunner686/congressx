import type { BillAction } from "@prisma/client";

import {
  billActions,
  billAction,
  createBillAction,
  updateBillAction,
  deleteBillAction,
} from "./billActions";
import type { StandardScenario } from "./billActions.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("billActions", () => {
  scenario("returns all billActions", async (scenario: StandardScenario) => {
    const result = await billActions();

    expect(result.length).toEqual(Object.keys(scenario.billAction).length);
  });

  scenario(
    "returns a single billAction",
    async (scenario: StandardScenario) => {
      const result = await billAction({ id: scenario.billAction.one.id });

      expect(result).toEqual(scenario.billAction.one);
    },
  );

  scenario("creates a billAction", async (scenario: StandardScenario) => {
    const result = await createBillAction({
      input: {
        code: "String",
        date: "2023-09-04T16:14:47.513Z",
        text: "String",
        type: "String",
        billId: scenario.billAction.two.billId,
      },
    });

    expect(result.code).toEqual("String");
    expect(result.date).toEqual(new Date("2023-09-04T16:14:47.513Z"));
    expect(result.text).toEqual("String");
    expect(result.type).toEqual("String");
    expect(result.billId).toEqual(scenario.billAction.two.billId);
  });

  scenario("updates a billAction", async (scenario: StandardScenario) => {
    const original = (await billAction({
      id: scenario.billAction.one.id,
    })) as BillAction;
    const result = await updateBillAction({
      id: original.id,
      input: { code: "String2" },
    });

    expect(result.code).toEqual("String2");
  });

  scenario("deletes a billAction", async (scenario: StandardScenario) => {
    const original = (await deleteBillAction({
      id: scenario.billAction.one.id,
    })) as BillAction;
    const result = await billAction({ id: original.id });

    expect(result).toEqual(null);
  });
});
