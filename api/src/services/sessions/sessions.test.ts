import type { Session } from "@prisma/client";

import {
  sessions,
  session,
  createSession,
  updateSession,
  deleteSession,
} from "./sessions";
import type { StandardScenario } from "./sessions.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("sessions", () => {
  scenario("returns all sessions", async (scenario: StandardScenario) => {
    const result = await sessions();

    expect(result.length).toEqual(Object.keys(scenario.session).length);
  });

  scenario("returns a single session", async (scenario: StandardScenario) => {
    const result = await session({ id: scenario.session.one.id });

    expect(result).toEqual(scenario.session.one);
  });

  scenario("creates a session", async (scenario: StandardScenario) => {
    const result = await createSession({
      input: {
        congressNumber: scenario.session.two.congressNumber,
        chamber: "String",
        startDate: "2023-09-04T21:48:56.550Z",
        endDate: "2023-09-04T21:48:56.550Z",
        type: "String",
        number: 3902299,
      },
    });

    expect(result.congressNumber).toEqual(scenario.session.two.congressNumber);
    expect(result.chamber).toEqual("String");
    expect(result.startDate).toEqual(new Date("2023-09-04T21:48:56.550Z"));
    expect(result.endDate).toEqual(new Date("2023-09-04T21:48:56.550Z"));
    expect(result.type).toEqual("String");
    expect(result.number).toEqual(3902299);
  });

  scenario("updates a session", async (scenario: StandardScenario) => {
    const original = (await session({
      id: scenario.session.one.id,
    })) as Session;
    const result = await updateSession({
      id: original.id,
      input: { chamber: "String2" },
    });

    expect(result.chamber).toEqual("String2");
  });

  scenario("deletes a session", async (scenario: StandardScenario) => {
    const original = (await deleteSession({
      id: scenario.session.one.id,
    })) as Session;
    const result = await session({ id: original.id });

    expect(result).toEqual(null);
  });
});
