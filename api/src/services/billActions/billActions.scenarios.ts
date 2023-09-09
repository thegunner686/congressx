import type { Prisma, BillAction } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.BillActionCreateArgs>({
  billAction: {
    one: {
      data: {
        code: "String",
        date: "2023-09-04T16:14:47.618Z",
        text: "String",
        type: "String",
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:14:47.618Z",
            originChamber: "String",
            type: "String",
            number: 8563253,
            congress: {
              create: { number: 9777961, startYear: 7979525, endYear: 5702153 },
            },
          },
        },
      },
    },
    two: {
      data: {
        code: "String",
        date: "2023-09-04T16:14:47.618Z",
        text: "String",
        type: "String",
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:14:47.618Z",
            originChamber: "String",
            type: "String",
            number: 3542336,
            congress: {
              create: { number: 9164997, startYear: 6155941, endYear: 9668703 },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<BillAction, "billAction">;
