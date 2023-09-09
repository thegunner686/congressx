import type { Prisma, Session } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.SessionCreateArgs>({
  session: {
    one: {
      data: {
        chamber: "String",
        startDate: "2023-09-04T21:48:56.596Z",
        endDate: "2023-09-04T21:48:56.596Z",
        type: "String",
        number: 1422807,
      },
    },
    two: {
      data: {
        chamber: "String",
        startDate: "2023-09-04T21:48:56.596Z",
        endDate: "2023-09-04T21:48:56.596Z",
        type: "String",
        number: 9230452,
      },
    },
  },
});

export type StandardScenario = ScenarioData<Session, "session">;
