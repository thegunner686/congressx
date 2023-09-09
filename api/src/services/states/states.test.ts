import type { State } from "@prisma/client";

import { states, state, createState, updateState, deleteState } from "./states";
import type { StandardScenario } from "./states.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("states", () => {
  scenario("returns all states", async (scenario: StandardScenario) => {
    const result = await states();

    expect(result.length).toEqual(Object.keys(scenario.state).length);
  });

  scenario("returns a single state", async (scenario: StandardScenario) => {
    const result = await state({ id: scenario.state.one.id });

    expect(result).toEqual(scenario.state.one);
  });

  scenario("creates a state", async () => {
    const result = await createState({
      input: { id: "String", name: "String", imageUrl: "String" },
    });

    expect(result.id).toEqual("String");
    expect(result.name).toEqual("String");
    expect(result.imageUrl).toEqual("String");
  });

  scenario("updates a state", async (scenario: StandardScenario) => {
    const original = (await state({ id: scenario.state.one.id })) as State;
    const result = await updateState({
      id: original.id,
      input: { id: "String2" },
    });

    expect(result.id).toEqual("String2");
  });

  scenario("deletes a state", async (scenario: StandardScenario) => {
    const original = (await deleteState({
      id: scenario.state.one.id,
    })) as State;
    const result = await state({ id: original.id });

    expect(result).toEqual(null);
  });
});
