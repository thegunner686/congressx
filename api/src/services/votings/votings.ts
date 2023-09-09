import type {
  QueryResolvers,
  MutationResolvers,
  VotingRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const votings: QueryResolvers["votings"] = () => {
  return db.voting.findMany();
};

export const voting: QueryResolvers["voting"] = ({ id }) => {
  return db.voting.findUnique({
    where: { id },
  });
};

export const createVoting: MutationResolvers["createVoting"] = ({ input }) => {
  return db.voting.create({
    data: input,
  });
};

export const updateVoting: MutationResolvers["updateVoting"] = ({
  id,
  input,
}) => {
  return db.voting.update({
    data: input,
    where: { id },
  });
};

export const deleteVoting: MutationResolvers["deleteVoting"] = ({ id }) => {
  return db.voting.delete({
    where: { id },
  });
};

export const Voting: VotingRelationResolvers = {
  bill: (_obj, { root }) => {
    return db.voting.findUnique({ where: { id: root?.id } }).bill();
  },
  votes: (_obj, { root }) => {
    return db.voting.findUnique({ where: { id: root?.id } }).votes();
  },
};
