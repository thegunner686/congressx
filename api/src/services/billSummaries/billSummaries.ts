import type {
  QueryResolvers,
  MutationResolvers,
  BillSummaryRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const billSummaries: QueryResolvers["billSummaries"] = () => {
  return db.billSummary.findMany();
};

export const billSummary: QueryResolvers["billSummary"] = ({ id }) => {
  return db.billSummary.findUnique({
    where: { id },
  });
};

export const createBillSummary: MutationResolvers["createBillSummary"] = ({
  input,
}) => {
  return db.billSummary.create({
    data: input,
  });
};

export const updateBillSummary: MutationResolvers["updateBillSummary"] = ({
  id,
  input,
}) => {
  return db.billSummary.update({
    data: input,
    where: { id },
  });
};

export const deleteBillSummary: MutationResolvers["deleteBillSummary"] = ({
  id,
}) => {
  return db.billSummary.delete({
    where: { id },
  });
};

export const BillSummary: BillSummaryRelationResolvers = {
  bill: (_obj, { root }) => {
    return db.billSummary.findUnique({ where: { id: root?.id } }).bill();
  },
};
