import type { Prisma, RepresentativeVote } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.RepresentativeVoteCreateArgs>({
  representativeVote: {
    one: {
      data: {
        id: "String",
        result: "String",
        voting: {
          create: {
            id: "String",
            congress: 8910211,
            session: "String",
            rollCallNumber: 5859594,
            status: "String",
            type: "String",
            bill: {
              create: {
                id: "String",
                title: "String",
                introducedDate: "2023-09-04T16:15:39.402Z",
                originChamber: "String",
                type: "String",
                number: 294930,
                congress: {
                  create: {
                    number: 5688024,
                    startYear: 42218,
                    endYear: 3626076,
                  },
                },
              },
            },
          },
        },
        representative: {
          create: {
            birthYear: 8790127,
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
        id: "String",
        result: "String",
        voting: {
          create: {
            id: "String",
            congress: 9340618,
            session: "String",
            rollCallNumber: 1849370,
            status: "String",
            type: "String",
            bill: {
              create: {
                id: "String",
                title: "String",
                introducedDate: "2023-09-04T16:15:39.402Z",
                originChamber: "String",
                type: "String",
                number: 1007285,
                congress: {
                  create: {
                    number: 7332016,
                    startYear: 8403414,
                    endYear: 1492653,
                  },
                },
              },
            },
          },
        },
        representative: {
          create: {
            birthYear: 911701,
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

export type StandardScenario = ScenarioData<
  RepresentativeVote,
  "representativeVote"
>;
