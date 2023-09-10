import type { Prisma, Representative } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.RepresentativeCreateArgs>({
  representative: {
    one: {
      data: {
        firstName: "String",
        lastName: "String",
        invertedOrderName: "String",
        active: true,
      },
    },
    two: {
      data: {
        firstName: "String",
        lastName: "String",
        invertedOrderName: "String",
        active: true,
      },
    },
  },
});

export type StandardScenario = ScenarioData<Representative, "representative">;
