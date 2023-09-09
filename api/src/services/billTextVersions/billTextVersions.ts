import type {
  QueryResolvers,
  MutationResolvers,
  BillTextVersionRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const billTextVersions: QueryResolvers["billTextVersions"] = () => {
  return db.billTextVersion.findMany();
};

export const billTextVersion: QueryResolvers["billTextVersion"] = ({ id }) => {
  return db.billTextVersion.findUnique({
    where: { id },
  });
};

export const createBillTextVersion: MutationResolvers["createBillTextVersion"] =
  ({ input }) => {
    return db.billTextVersion.create({
      data: input,
    });
  };

export const updateBillTextVersion: MutationResolvers["updateBillTextVersion"] =
  ({ id, input }) => {
    return db.billTextVersion.update({
      data: input,
      where: { id },
    });
  };

export const deleteBillTextVersion: MutationResolvers["deleteBillTextVersion"] =
  ({ id }) => {
    return db.billTextVersion.delete({
      where: { id },
    });
  };

export const BillTextVersion: BillTextVersionRelationResolvers = {
  bill: (_obj, { root }) => {
    return db.billTextVersion.findUnique({ where: { id: root?.id } }).bill();
  },
};
