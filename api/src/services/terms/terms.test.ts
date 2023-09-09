import type { Term } from "@prisma/client";

import { terms, term, createTerm, updateTerm, deleteTerm } from "./terms";
import type { StandardScenario } from "./terms.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("terms", () => {
  scenario("returns all terms", async (scenario: StandardScenario) => {
    const result = await terms();

    expect(result.length).toEqual(Object.keys(scenario.term).length);
  });

  scenario("returns a single term", async (scenario: StandardScenario) => {
    const result = await term({ id: scenario.term.one.id });

    expect(result).toEqual(scenario.term.one);
  });

  scenario("creates a term", async (scenario: StandardScenario) => {
    const result = await createTerm({
      input: {
        chamber: "String",
        congressNumber: scenario.term.two.congressNumber,
        startYear: 6465868,
        representativeId: scenario.term.two.representativeId,
      },
    });

    expect(result.chamber).toEqual("String");
    expect(result.congressNumber).toEqual(scenario.term.two.congressNumber);
    expect(result.startYear).toEqual(6465868);
    expect(result.representativeId).toEqual(scenario.term.two.representativeId);
  });

  scenario("updates a term", async (scenario: StandardScenario) => {
    const original = (await term({ id: scenario.term.one.id })) as Term;
    const result = await updateTerm({
      id: original.id,
      input: { chamber: "String2" },
    });

    expect(result.chamber).toEqual("String2");
  });

  scenario("deletes a term", async (scenario: StandardScenario) => {
    const original = (await deleteTerm({ id: scenario.term.one.id })) as Term;
    const result = await term({ id: original.id });

    expect(result).toEqual(null);
  });
});
