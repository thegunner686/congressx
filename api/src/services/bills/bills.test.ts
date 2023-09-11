import type { Bill } from "@prisma/client";

import { bills, bill, createBill, updateBill, deleteBill } from "./bills";
import type { StandardScenario } from "./bills.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("bills", () => {
  scenario("returns all bills", async (scenario: StandardScenario) => {
    const result = await bills();

    expect(result.length).toEqual(Object.keys(scenario.bill).length);
  });

  scenario("returns a single bill", async (scenario: StandardScenario) => {
    const result = await bill({ id: scenario.bill.one.id });

    expect(result).toEqual(scenario.bill.one);
  });

  scenario("creates a bill", async (scenario: StandardScenario) => {
    const result = await createBill({
      input: {
        id: "String",
        title: "String",
        introducedDate: "2023-09-11T01:17:27.945Z",
        congressNumber: scenario.bill.two.congressNumber,
        originChamber: "String",
        type: "String",
        number: 7083821,
      },
    });

    expect(result.id).toEqual("String");
    expect(result.title).toEqual("String");
    expect(result.introducedDate).toEqual(new Date("2023-09-11T01:17:27.945Z"));
    expect(result.congressNumber).toEqual(scenario.bill.two.congressNumber);
    expect(result.originChamber).toEqual("String");
    expect(result.type).toEqual("String");
    expect(result.number).toEqual(7083821);
  });

  scenario("updates a bill", async (scenario: StandardScenario) => {
    const original = (await bill({ id: scenario.bill.one.id })) as Bill;
    const result = await updateBill({
      id: original.id,
      input: { id: "String2" },
    });

    expect(result.id).toEqual("String2");
  });

  scenario("deletes a bill", async (scenario: StandardScenario) => {
    const original = (await deleteBill({ id: scenario.bill.one.id })) as Bill;
    const result = await bill({ id: original.id });

    expect(result).toEqual(null);
  });
});
