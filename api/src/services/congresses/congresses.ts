import type {
  QueryResolvers,
  MutationResolvers,
  CongressRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const congresses: QueryResolvers["congresses"] = () => {
  return db.congress.findMany();
};

export const congress: QueryResolvers["congress"] = ({ id }) => {
  return db.congress.findUnique({
    where: { id },
  });
};

export const createCongress: MutationResolvers["createCongress"] = ({
  input,
}) => {
  return db.congress.create({
    data: input,
  });
};

export const updateCongress: MutationResolvers["updateCongress"] = ({
  id,
  input,
}) => {
  return db.congress.update({
    data: input,
    where: { id },
  });
};

export const deleteCongress: MutationResolvers["deleteCongress"] = ({ id }) => {
  return db.congress.delete({
    where: { id },
  });
};

export const Congress: CongressRelationResolvers = {
  sessions: (_obj, { root }) => {
    return db.congress.findUnique({ where: { id: root?.id } }).sessions();
  },
  members: (_obj, { root }) => {
    return db.congress.findUnique({ where: { id: root?.id } }).members();
  },
  bills: (_obj, { root }) => {
    return db.congress.findUnique({ where: { id: root?.id } }).bills();
  },
  leadership: (_obj, { root }) => {
    return db.congress.findUnique({ where: { id: root?.id } }).leadership();
  },
  terms: (_obj, { root }) => {
    return db.congress.findUnique({ where: { id: root?.id } }).terms();
  },
};
