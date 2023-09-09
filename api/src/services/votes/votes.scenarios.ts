import type { Prisma, Vote } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.VoteCreateArgs>({
  vote: {
    one: {
      data: { result: "String", user: { create: { email: "String4955261" } } },
    },
    two: {
      data: { result: "String", user: { create: { email: "String8280461" } } },
    },
  },
});

export type StandardScenario = ScenarioData<Vote, "vote">;
