import type { Prisma, User } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.UserCreateArgs>({
  user: {
    one: { data: { email: "String8296136" } },
    two: { data: { email: "String3629232" } },
  },
});

export type StandardScenario = ScenarioData<User, "user">;
