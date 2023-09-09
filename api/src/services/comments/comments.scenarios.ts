import type { Prisma, Comment } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.CommentCreateArgs>({
  comment: {
    one: {
      data: { text: "String", user: { create: { email: "String1663599" } } },
    },
    two: {
      data: { text: "String", user: { create: { email: "String4614269" } } },
    },
  },
});

export type StandardScenario = ScenarioData<Comment, "comment">;
