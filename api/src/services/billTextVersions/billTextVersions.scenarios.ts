import type { Prisma, BillTextVersion } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.BillTextVersionCreateArgs>({
  billTextVersion: {
    one: {
      data: {
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:14:57.261Z",
            originChamber: "String",
            type: "String",
            number: 5789187,
            congress: {
              create: { number: 2799096, startYear: 8080019, endYear: 258761 },
            },
          },
        },
      },
    },
    two: {
      data: {
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:14:57.261Z",
            originChamber: "String",
            type: "String",
            number: 7467968,
            congress: {
              create: { number: 1043813, startYear: 8177116, endYear: 1102353 },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<BillTextVersion, "billTextVersion">;
