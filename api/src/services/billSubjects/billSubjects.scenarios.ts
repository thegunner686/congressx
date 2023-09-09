import type { Prisma, BillSubject } from "@prisma/client";
import type { ScenarioData } from "@redwoodjs/testing/api";

export const standard = defineScenario<Prisma.BillSubjectCreateArgs>({
  billSubject: {
    one: { data: { name: "String", type: "String" } },
    two: { data: { name: "String", type: "String" } },
  },
});

export type StandardScenario = ScenarioData<BillSubject, "billSubject">;
