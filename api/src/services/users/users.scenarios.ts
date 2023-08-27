import type { Prisma, User } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: "String7373776" } },
    two: { data: { email: "String6192457" } },
  },
});

export type StandardScenario = ScenarioData<User, "user">;
