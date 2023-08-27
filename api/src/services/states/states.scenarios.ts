import type { Prisma, State } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.StateCreateArgs>({
  state: {
    one: {
      data: { name: "String", abbreviation: "String", imageUrl: "String" },
    },
    two: {
      data: { name: "String", abbreviation: "String", imageUrl: "String" },
    },
  },
});

export type StandardScenario = ScenarioData<State, "state">;
