import type { Prisma, Leadership } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.LeadershipCreateArgs>({
  leadership: {
    one: {
      data: {
        type: "String",
        representative: {
          create: {
            birthYear: 3936147,
            imageUrl: "String",
            honorificName: "String",
            directOrderName: "String",
            firstName: "String",
            lastName: "String",
            invertedOrderName: "String",
            active: true,
          },
        },
        congress: {
          create: { number: 4643918, startYear: 6250231, endYear: 9798542 },
        },
      },
    },
    two: {
      data: {
        type: "String",
        representative: {
          create: {
            birthYear: 9324221,
            imageUrl: "String",
            honorificName: "String",
            directOrderName: "String",
            firstName: "String",
            lastName: "String",
            invertedOrderName: "String",
            active: true,
          },
        },
        congress: {
          create: { number: 5387525, startYear: 1078885, endYear: 1371099 },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Leadership, "leadership">;
