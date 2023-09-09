import type {
  QueryResolvers,
  MutationResolvers,
  BillActionRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const billActions: QueryResolvers["billActions"] = () => {
  return db.billAction.findMany();
};

export const billAction: QueryResolvers["billAction"] = ({ id }) => {
  return db.billAction.findUnique({
    where: { id },
  });
};

export const createBillAction: MutationResolvers["createBillAction"] = ({
  input,
}) => {
  return db.billAction.create({
    data: input,
  });
};

export const updateBillAction: MutationResolvers["updateBillAction"] = ({
  id,
  input,
}) => {
  return db.billAction.update({
    data: input,
    where: { id },
  });
};

export const deleteBillAction: MutationResolvers["deleteBillAction"] = ({
  id,
}) => {
  return db.billAction.delete({
    where: { id },
  });
};

export const BillAction: BillActionRelationResolvers = {
  bill: (_obj, { root }) => {
    return db.billAction.findUnique({ where: { id: root?.id } }).bill();
  },
};
