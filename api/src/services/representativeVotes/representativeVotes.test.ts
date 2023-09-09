import type { RepresentativeVote } from "@prisma/client";

import {
  representativeVotes,
  representativeVote,
  createRepresentativeVote,
  updateRepresentativeVote,
  deleteRepresentativeVote,
} from "./representativeVotes";
import type { StandardScenario } from "./representativeVotes.scenarios";

// Generated boilerplate tests do not account for all circumstances
// and can fail without adjustments, e.g. Float.
//           Please refer to the RedwoodJS Testing Docs:
//       https://redwoodjs.com/docs/testing#testing-services
// https://redwoodjs.com/docs/testing#jest-expect-type-considerations

describe("representativeVotes", () => {
  scenario(
    "returns all representativeVotes",
    async (scenario: StandardScenario) => {
      const result = await representativeVotes();

      expect(result.length).toEqual(
        Object.keys(scenario.representativeVote).length,
      );
    },
  );

  scenario(
    "returns a single representativeVote",
    async (scenario: StandardScenario) => {
      const result = await representativeVote({
        id: scenario.representativeVote.one.id,
      });

      expect(result).toEqual(scenario.representativeVote.one);
    },
  );

  scenario(
    "creates a representativeVote",
    async (scenario: StandardScenario) => {
      const result = await createRepresentativeVote({
        input: {
          id: "String",
          votingId: scenario.representativeVote.two.votingId,
          representativeId: scenario.representativeVote.two.representativeId,
          result: "String",
        },
      });

      expect(result.id).toEqual("String");
      expect(result.votingId).toEqual(scenario.representativeVote.two.votingId);
      expect(result.representativeId).toEqual(
        scenario.representativeVote.two.representativeId,
      );
      expect(result.result).toEqual("String");
    },
  );

  scenario(
    "updates a representativeVote",
    async (scenario: StandardScenario) => {
      const original = (await representativeVote({
        id: scenario.representativeVote.one.id,
      })) as RepresentativeVote;
      const result = await updateRepresentativeVote({
        id: original.id,
        input: { id: "String2" },
      });

      expect(result.id).toEqual("String2");
    },
  );

  scenario(
    "deletes a representativeVote",
    async (scenario: StandardScenario) => {
      const original = (await deleteRepresentativeVote({
        id: scenario.representativeVote.one.id,
      })) as RepresentativeVote;
      const result = await representativeVote({ id: original.id });

      expect(result).toEqual(null);
    },
  );
});
