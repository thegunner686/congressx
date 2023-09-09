import type { Prisma, Term } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.TermCreateArgs>({
  term: {
    one: {
      data: {
        chamber: "String",
        startYear: 7498555,
        congress: {
          create: { number: 9635241, startYear: 3964483, endYear: 7095949 },
        },
        representative: {
          create: {
            birthYear: 1933123,
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
        chamber: "String",
        startYear: 2032526,
        congress: {
          create: { number: 7617322, startYear: 4637265, endYear: 3071182 },
        },
        representative: {
          create: {
            birthYear: 7550998,
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

export type StandardScenario = ScenarioData<Term, "term">;
