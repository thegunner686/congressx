import type { Representative } from "@prisma/client";

import {
  representatives,
  representative,
  createRepresentative,
  updateRepresentative,
  deleteRepresentative,
} from "./representatives";
import type { StandardScenario } from "./representatives.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("representatives", () => {
  scenario(
    "returns all representatives",
    async (scenario: StandardScenario) => {
      const result = await representatives();

      expect(result.length).toEqual(
        Object.keys(scenario.representative).length,
      );
    },
  );

  scenario(
    "returns a single representative",
    async (scenario: StandardScenario) => {
      const result = await representative({
        id: scenario.representative.one.id,
      });

      expect(result).toEqual(scenario.representative.one);
    },
  );

  scenario("creates a representative", async () => {
    const result = await createRepresentative({
      input: {
        firstName: "String",
        lastName: "String",
        invertedOrderName: "String",
        active: true,
      },
    });

    expect(result.firstName).toEqual("String");
    expect(result.lastName).toEqual("String");
    expect(result.invertedOrderName).toEqual("String");
    expect(result.active).toEqual(true);
  });

  scenario("updates a representative", async (scenario: StandardScenario) => {
    const original = (await representative({
      id: scenario.representative.one.id,
    })) as Representative;
    const result = await updateRepresentative({
      id: original.id,
      input: { firstName: "String2" },
    });

    expect(result.firstName).toEqual("String2");
  });

  scenario("deletes a representative", async (scenario: StandardScenario) => {
    const original = (await deleteRepresentative({
      id: scenario.representative.one.id,
    })) as Representative;
    const result = await representative({ id: original.id });

    expect(result).toEqual(null);
  });
});
