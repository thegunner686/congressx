import type { Prisma, Representative } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.RepresentativeCreateArgs>({
  representative: {
    one: {
      data: {
        birthYear: 7616719,
        imageUrl: "String",
        honorificName: "String",
        directOrderName: "String",
        firstName: "String",
        lastName: "String",
        invertedOrderName: "String",
        active: true,
      },
    },
    two: {
      data: {
        birthYear: 6967016,
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
});

export type StandardScenario = ScenarioData<Representative, "representative">;
