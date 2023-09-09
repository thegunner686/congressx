import type { Prisma, Congress } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.CongressCreateArgs>({
  congress: {
    one: {
      data: {
        number: 6936306,
        name: "String",
        startYear: 7980548,
        endYear: 3781115,
      },
    },
    two: {
      data: {
        number: 6856852,
        name: "String",
        startYear: 3277820,
        endYear: 1008700,
      },
    },
  },
});

export type StandardScenario = ScenarioData<Congress, "congress">;
