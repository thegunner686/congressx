import type { Prisma, State } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.StateCreateArgs>({
  state: {
    one: { data: { id: "String", name: "String", imageUrl: "String" } },
    two: { data: { id: "String", name: "String", imageUrl: "String" } },
  },
});

export type StandardScenario = ScenarioData<State, "state">;
