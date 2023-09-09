import type { Prisma, District } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.DistrictCreateArgs>({
  district: {
    one: {
      data: {
        number: 5751186,
        state: { create: { id: "String", name: "String", imageUrl: "String" } },
        representative: {
          create: {
            birthYear: 3981264,
            imageUrl: "String",
            honorificName: "String",
            directOrderName: "String",
            firstName: "String",
            lastName: "String",
            invertedOrderName: "String",
            active: true,
          },
        },
      },
    },
    two: {
      data: {
        number: 5382560,
        state: { create: { id: "String", name: "String", imageUrl: "String" } },
        representative: {
          create: {
            birthYear: 6334668,
            imageUrl: "String",
            honorificName: "String",
            directOrderName: "String",
            firstName: "String",
            lastName: "String",
            invertedOrderName: "String",
            active: true,
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<District, "district">;
