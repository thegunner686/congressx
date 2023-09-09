import type { BillSubject } from "@prisma/client";

import {
  billSubjects,
  billSubject,
  createBillSubject,
  updateBillSubject,
  deleteBillSubject,
} from "./billSubjects";
import type { StandardScenario } from "./billSubjects.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("billSubjects", () => {
  scenario("returns all billSubjects", async (scenario: StandardScenario) => {
    const result = await billSubjects();

    expect(result.length).toEqual(Object.keys(scenario.billSubject).length);
  });

  scenario(
    "returns a single billSubject",
    async (scenario: StandardScenario) => {
      const result = await billSubject({ id: scenario.billSubject.one.id });

      expect(result).toEqual(scenario.billSubject.one);
    },
  );

  scenario("creates a billSubject", async () => {
    const result = await createBillSubject({
      input: { name: "String", type: "String" },
    });

    expect(result.name).toEqual("String");
    expect(result.type).toEqual("String");
  });

  scenario("updates a billSubject", async (scenario: StandardScenario) => {
    const original = (await billSubject({
      id: scenario.billSubject.one.id,
    })) as BillSubject;
    const result = await updateBillSubject({
      id: original.id,
      input: { name: "String2" },
    });

    expect(result.name).toEqual("String2");
  });

  scenario("deletes a billSubject", async (scenario: StandardScenario) => {
    const original = (await deleteBillSubject({
      id: scenario.billSubject.one.id,
    })) as BillSubject;
    const result = await billSubject({ id: original.id });

    expect(result).toEqual(null);
  });
});
