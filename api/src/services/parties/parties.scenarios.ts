import type { Prisma, Party } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.PartyCreateArgs>({
  party: {
    one: { data: { name: "String", abbreviation: "String" } },
    two: { data: { name: "String", abbreviation: "String" } },
  },
});

export type StandardScenario = ScenarioData<Party, "party">;
