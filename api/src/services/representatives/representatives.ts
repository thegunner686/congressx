import type { QueryResolvers, MutationResolvers } from "types/graphql";

import { db } from "src/lib/db";

export const representatives: QueryResolvers["representatives"] = () => {
  return db.representative.findMany();
};

export const representative: QueryResolvers["representative"] = ({ id }) => {
  return db.representative.findUnique({
    where: { id },
  });
};

export const createRepresentative: MutationResolvers["createRepresentative"] =
  ({ input }) => {
    return db.representative.create({
      data: input,
    });
  };

export const updateRepresentative: MutationResolvers["updateRepresentative"] =
  ({ id, input }) => {
    return db.representative.update({
      data: input,
      where: { id },
    });
  };

export const deleteRepresentative: MutationResolvers["deleteRepresentative"] =
  ({ id }) => {
    return db.representative.delete({
      where: { id },
    });
  };
