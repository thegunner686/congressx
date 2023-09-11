import type { Prisma, Bill } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.BillCreateArgs>({
  bill: {
    one: {
      data: {
        id: "String",
        title: "String",
        introducedDate: "2023-09-11T01:17:27.958Z",
        originChamber: "String",
        type: "String",
        number: 9999456,
      },
    },
    two: {
      data: {
        id: "String",
        title: "String",
        introducedDate: "2023-09-11T01:17:27.958Z",
        originChamber: "String",
        type: "String",
        number: 1130729,
      },
    },
  },
});

export type StandardScenario = ScenarioData<Bill, "bill">;
