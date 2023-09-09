import type { Prisma, BillSummary } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.BillSummaryCreateArgs>({
  billSummary: {
    one: {
      data: {
        actionDate: "2023-09-04T16:15:19.037Z",
        actionDescription: "String",
        text: "String",
        updateDate: "2023-09-04T16:15:19.037Z",
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:15:19.037Z",
            originChamber: "String",
            type: "String",
            number: 7110568,
            congress: {
              create: { number: 4322055, startYear: 5444819, endYear: 5898662 },
            },
          },
        },
      },
    },
    two: {
      data: {
        actionDate: "2023-09-04T16:15:19.037Z",
        actionDescription: "String",
        text: "String",
        updateDate: "2023-09-04T16:15:19.037Z",
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:15:19.037Z",
            originChamber: "String",
            type: "String",
            number: 1831766,
            congress: {
              create: { number: 6958637, startYear: 3804188, endYear: 1710529 },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<BillSummary, "billSummary">;
