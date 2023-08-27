import type { Prisma, Representative } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.RepresentativeCreateArgs>({
  representative: {
    one: {
      data: {
        imageUrl: "String",
        invertedOrderName: "String",
        partyName: "String",
        startYear: 9373420,
        state: "String",
        currentChamber: "String",
      },
    },
    two: {
      data: {
        imageUrl: "String",
        invertedOrderName: "String",
        partyName: "String",
        startYear: 5348490,
        state: "String",
        currentChamber: "String",
      },
    },
  },
});

export type StandardScenario = ScenarioData<Representative, "representative">;
