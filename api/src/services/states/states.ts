import type {
  QueryResolvers,
  MutationResolvers,
  StateRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const states: QueryResolvers["states"] = () => {
  return db.state.findMany();
};

export const state: QueryResolvers["state"] = ({ id }) => {
  return db.state.findUnique({
    where: { id },
  });
};

export const createState: MutationResolvers["createState"] = ({ input }) => {
  return db.state.create({
    data: input,
  });
};

export const updateState: MutationResolvers["updateState"] = ({
  id,
  input,
}) => {
  return db.state.update({
    data: input,
    where: { id },
  });
};

export const deleteState: MutationResolvers["deleteState"] = ({ id }) => {
  return db.state.delete({
    where: { id },
  });
};

export const State: StateRelationResolvers = {
  representatives: (_obj, { root }) => {
    return db.state.findUnique({ where: { id: root?.id } }).representatives();
  },
  residents: (_obj, { root }) => {
    return db.state.findUnique({ where: { id: root?.id } }).residents();
  },
  districts: (_obj, { root }) => {
    return db.state.findUnique({ where: { id: root?.id } }).districts();
  },
  polls: (_obj, { root }) => {
    return db.state.findUnique({ where: { id: root?.id } }).polls();
  },
};
