import type { Prisma, Voting } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.VotingCreateArgs>({
  voting: {
    one: {
      data: {
        id: "String",
        congress: 3880931,
        session: "String",
        rollCallNumber: 6131152,
        status: "String",
        type: "String",
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:15:28.193Z",
            originChamber: "String",
            type: "String",
            number: 6123374,
            congress: {
              create: { number: 1223778, startYear: 2634507, endYear: 8340226 },
            },
          },
        },
      },
    },
    two: {
      data: {
        id: "String",
        congress: 2329254,
        session: "String",
        rollCallNumber: 1238701,
        status: "String",
        type: "String",
        bill: {
          create: {
            id: "String",
            title: "String",
            introducedDate: "2023-09-04T16:15:28.193Z",
            originChamber: "String",
            type: "String",
            number: 1475187,
            congress: {
              create: { number: 1173985, startYear: 9814123, endYear: 4164115 },
            },
          },
        },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Voting, "voting">;
