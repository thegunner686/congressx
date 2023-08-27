import type { Prisma, User } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: "String1004505" } },
    two: { data: { email: "String1884989" } },
  },
});

export type StandardScenario = ScenarioData<User, "user">;
