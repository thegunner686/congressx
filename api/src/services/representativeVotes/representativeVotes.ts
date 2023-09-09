import type {
  QueryResolvers,
  MutationResolvers,
  RepresentativeVoteRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const representativeVotes: QueryResolvers["representativeVotes"] =
  () => {
    return db.representativeVote.findMany();
  };

export const representativeVote: QueryResolvers["representativeVote"] = ({
  id,
}) => {
  return db.representativeVote.findUnique({
    where: { id },
  });
};

export const createRepresentativeVote: MutationResolvers["createRepresentativeVote"] =
  ({ input }) => {
    return db.representativeVote.create({
      data: input,
    });
  };

export const updateRepresentativeVote: MutationResolvers["updateRepresentativeVote"] =
  ({ id, input }) => {
    return db.representativeVote.update({
      data: input,
      where: { id },
    });
  };

export const deleteRepresentativeVote: MutationResolvers["deleteRepresentativeVote"] =
  ({ id }) => {
    return db.representativeVote.delete({
      where: { id },
    });
  };

export const RepresentativeVote: RepresentativeVoteRelationResolvers = {
  voting: (_obj, { root }) => {
    return db.representativeVote
      .findUnique({ where: { id: root?.id } })
      .voting();
  },
  representative: (_obj, { root }) => {
    return db.representativeVote
      .findUnique({ where: { id: root?.id } })
      .representative();
  },
};
