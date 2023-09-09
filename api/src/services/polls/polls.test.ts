import type { Poll } from "@prisma/client";

import { polls, poll, createPoll, updatePoll, deletePoll } from "./polls";
import type { StandardScenario } from "./polls.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("polls", () => {
  scenario("returns all polls", async (scenario: StandardScenario) => {
    const result = await polls();

    expect(result.length).toEqual(Object.keys(scenario.poll).length);
  });

  scenario("returns a single poll", async (scenario: StandardScenario) => {
    const result = await poll({ id: scenario.poll.one.id });

    expect(result).toEqual(scenario.poll.one);
  });

  scenario("creates a poll", async (scenario: StandardScenario) => {
    const result = await createPoll({
      input: {
        title: "String",
        text: "String",
        stateId: scenario.poll.two.stateId,
        userId: scenario.poll.two.userId,
        createdOn: "2023-09-04T16:16:13.615Z",
      },
    });

    expect(result.title).toEqual("String");
    expect(result.text).toEqual("String");
    expect(result.stateId).toEqual(scenario.poll.two.stateId);
    expect(result.userId).toEqual(scenario.poll.two.userId);
    expect(result.createdOn).toEqual(new Date("2023-09-04T16:16:13.615Z"));
  });

  scenario("updates a poll", async (scenario: StandardScenario) => {
    const original = (await poll({ id: scenario.poll.one.id })) as Poll;
    const result = await updatePoll({
      id: original.id,
      input: { title: "String2" },
    });

    expect(result.title).toEqual("String2");
  });

  scenario("deletes a poll", async (scenario: StandardScenario) => {
    const original = (await deletePoll({ id: scenario.poll.one.id })) as Poll;
    const result = await poll({ id: original.id });

    expect(result).toEqual(null);
  });
});
