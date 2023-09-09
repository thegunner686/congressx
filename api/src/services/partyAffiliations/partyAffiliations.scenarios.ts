import type { Prisma, PartyAffiliation } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.PartyAffiliationCreateArgs>({
  partyAffiliation: {
    one: {
      data: {
        representative: {
          create: {
            birthYear: 8479312,
            imageUrl: "String",
            honorificName: "String",
            directOrderName: "String",
            firstName: "String",
            lastName: "String",
            invertedOrderName: "String",
            active: true,
          },
        },
        party: { create: { name: "String", abbreviation: "String" } },
      },
    },
    two: {
      data: {
        representative: {
          create: {
            birthYear: 2278485,
            imageUrl: "String",
            honorificName: "String",
            directOrderName: "String",
            firstName: "String",
            lastName: "String",
            invertedOrderName: "String",
            active: true,
          },
        },
        party: { create: { name: "String", abbreviation: "String" } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<
  PartyAffiliation,
  "partyAffiliation"
>;
