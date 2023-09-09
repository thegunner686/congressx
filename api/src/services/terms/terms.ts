import type {
  QueryResolvers,
  MutationResolvers,
  TermRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const terms: QueryResolvers["terms"] = () => {
  return db.term.findMany();
};

export const term: QueryResolvers["term"] = ({ id }) => {
  return db.term.findUnique({
    where: { id },
  });
};

export const createTerm: MutationResolvers["createTerm"] = ({ input }) => {
  return db.term.create({
    data: input,
  });
};

export const updateTerm: MutationResolvers["updateTerm"] = ({ id, input }) => {
  return db.term.update({
    data: input,
    where: { id },
  });
};

export const deleteTerm: MutationResolvers["deleteTerm"] = ({ id }) => {
  return db.term.delete({
    where: { id },
  });
};

export const Term: TermRelationResolvers = {
  congress: (_obj, { root }) => {
    return db.term.findUnique({ where: { id: root?.id } }).congress();
  },
  representative: (_obj, { root }) => {
    return db.term.findUnique({ where: { id: root?.id } }).representative();
  },
};
