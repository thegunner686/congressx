import type { District } from "@prisma/client";

import {
  districts,
  district,
  createDistrict,
  updateDistrict,
  deleteDistrict,
} from "./districts";
import type { StandardScenario } from "./districts.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("districts", () => {
  scenario("returns all districts", async (scenario: StandardScenario) => {
    const result = await districts();

    expect(result.length).toEqual(Object.keys(scenario.district).length);
  });

  scenario("returns a single district", async (scenario: StandardScenario) => {
    const result = await district({ id: scenario.district.one.id });

    expect(result).toEqual(scenario.district.one);
  });

  scenario("creates a district", async (scenario: StandardScenario) => {
    const result = await createDistrict({
      input: {
        stateId: scenario.district.two.stateId,
        number: 6983980,
        representativeId: scenario.district.two.representativeId,
      },
    });

    expect(result.stateId).toEqual(scenario.district.two.stateId);
    expect(result.number).toEqual(6983980);
    expect(result.representativeId).toEqual(
      scenario.district.two.representativeId,
    );
  });

  scenario("updates a district", async (scenario: StandardScenario) => {
    const original = (await district({
      id: scenario.district.one.id,
    })) as District;
    const result = await updateDistrict({
      id: original.id,
      input: { number: 3449303 },
    });

    expect(result.number).toEqual(3449303);
  });

  scenario("deletes a district", async (scenario: StandardScenario) => {
    const original = (await deleteDistrict({
      id: scenario.district.one.id,
    })) as District;
    const result = await district({ id: original.id });

    expect(result).toEqual(null);
  });
});
