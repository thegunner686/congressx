import type { Prisma, Bill } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.BillCreateArgs>({
  bill: {
    one: {
      data: {
        id: "String",
        title: "String",
        introducedDate: "2023-09-04T16:14:38.306Z",
        originChamber: "String",
        type: "String",
        number: 6777301,
        congress: {
          create: { number: 3171285, startYear: 7530817, endYear: 439459 },
        },
      },
    },
    two: {
      data: {
        id: "String",
        title: "String",
        introducedDate: "2023-09-04T16:14:38.307Z",
        originChamber: "String",
        type: "String",
        number: 6699474,
        congress: {
          create: { number: 5704069, startYear: 3512035, endYear: 1340918 },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Bill, "bill">;
