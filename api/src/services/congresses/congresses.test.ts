import type { Congress } from "@prisma/client";

import {
  congresses,
  congress,
  createCongress,
  updateCongress,
  deleteCongress,
} from "./congresses";
import type { StandardScenario } from "./congresses.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("congresses", () => {
  scenario("returns all congresses", async (scenario: StandardScenario) => {
    const result = await congresses();

    expect(result.length).toEqual(Object.keys(scenario.congress).length);
  });

  scenario("returns a single congress", async (scenario: StandardScenario) => {
    const result = await congress({ id: scenario.congress.one.id });

    expect(result).toEqual(scenario.congress.one);
  });

  scenario("creates a congress", async () => {
    const result = await createCongress({
      input: {
        number: 5030886,
        name: "String",
        startYear: 5735922,
        endYear: 7674355,
      },
    });

    expect(result.number).toEqual(5030886);
    expect(result.name).toEqual("String");
    expect(result.startYear).toEqual(5735922);
    expect(result.endYear).toEqual(7674355);
  });

  scenario("updates a congress", async (scenario: StandardScenario) => {
    const original = (await congress({
      id: scenario.congress.one.id,
    })) as Congress;
    const result = await updateCongress({
      id: original.id,
      input: { number: 7880927 },
    });

    expect(result.number).toEqual(7880927);
  });

  scenario("deletes a congress", async (scenario: StandardScenario) => {
    const original = (await deleteCongress({
      id: scenario.congress.one.id,
    })) as Congress;
    const result = await congress({ id: original.id });

    expect(result).toEqual(null);
  });
});
