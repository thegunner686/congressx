import type { Prisma, Poll } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.PollCreateArgs>({
  poll: {
    one: {
      data: {
        title: "String",
        text: "String",
        createdOn: "2023-09-04T16:16:13.640Z",
        state: { create: { id: "String", name: "String", imageUrl: "String" } },
        createdBy: { create: { email: "String1461761" } },
      },
    },
    two: {
      data: {
        title: "String",
        text: "String",
        createdOn: "2023-09-04T16:16:13.640Z",
        state: { create: { id: "String", name: "String", imageUrl: "String" } },
        createdBy: { create: { email: "String5958436" } },
      },
    },
  },
});

export type StandardScenario = ScenarioData<Poll, "poll">;
