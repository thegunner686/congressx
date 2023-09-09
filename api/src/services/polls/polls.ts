import type {
  QueryResolvers,
  MutationResolvers,
  PollRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const polls: QueryResolvers["polls"] = () => {
  return db.poll.findMany();
};

export const poll: QueryResolvers["poll"] = ({ id }) => {
  return db.poll.findUnique({
    where: { id },
  });
};

export const createPoll: MutationResolvers["createPoll"] = ({ input }) => {
  return db.poll.create({
    data: input,
  });
};

export const updatePoll: MutationResolvers["updatePoll"] = ({ id, input }) => {
  return db.poll.update({
    data: input,
    where: { id },
  });
};

export const deletePoll: MutationResolvers["deletePoll"] = ({ id }) => {
  return db.poll.delete({
    where: { id },
  });
};

export const Poll: PollRelationResolvers = {
  state: (_obj, { root }) => {
    return db.poll.findUnique({ where: { id: root?.id } }).state();
  },
  district: (_obj, { root }) => {
    return db.poll.findUnique({ where: { id: root?.id } }).district();
  },
  createdBy: (_obj, { root }) => {
    return db.poll.findUnique({ where: { id: root?.id } }).createdBy();
  },
  comments: (_obj, { root }) => {
    return db.poll.findUnique({ where: { id: root?.id } }).comments();
  },
  votes: (_obj, { root }) => {
    return db.poll.findUnique({ where: { id: root?.id } }).votes();
  },
};
