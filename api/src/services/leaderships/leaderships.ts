import type {
  QueryResolvers,
  MutationResolvers,
  LeadershipRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const leaderships: QueryResolvers["leaderships"] = () => {
  return db.leadership.findMany();
};

export const leadership: QueryResolvers["leadership"] = ({ id }) => {
  return db.leadership.findUnique({
    where: { id },
  });
};

export const createLeadership: MutationResolvers["createLeadership"] = ({
  input,
}) => {
  return db.leadership.create({
    data: input,
  });
};

export const updateLeadership: MutationResolvers["updateLeadership"] = ({
  id,
  input,
}) => {
  return db.leadership.update({
    data: input,
    where: { id },
  });
};

export const deleteLeadership: MutationResolvers["deleteLeadership"] = ({
  id,
}) => {
  return db.leadership.delete({
    where: { id },
  });
};

export const Leadership: LeadershipRelationResolvers = {
  representative: (_obj, { root }) => {
    return db.leadership
      .findUnique({ where: { id: root?.id } })
      .representative();
  },
  congress: (_obj, { root }) => {
    return db.leadership.findUnique({ where: { id: root?.id } }).congress();
  },
};
