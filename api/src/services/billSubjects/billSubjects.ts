import type {
  QueryResolvers,
  MutationResolvers,
  BillSubjectRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const billSubjects: QueryResolvers["billSubjects"] = () => {
  return db.billSubject.findMany();
};

export const billSubject: QueryResolvers["billSubject"] = ({ id }) => {
  return db.billSubject.findUnique({
    where: { id },
  });
};

export const createBillSubject: MutationResolvers["createBillSubject"] = ({
  input,
}) => {
  return db.billSubject.create({
    data: input,
  });
};

export const updateBillSubject: MutationResolvers["updateBillSubject"] = ({
  id,
  input,
}) => {
  return db.billSubject.update({
    data: input,
    where: { id },
  });
};

export const deleteBillSubject: MutationResolvers["deleteBillSubject"] = ({
  id,
}) => {
  return db.billSubject.delete({
    where: { id },
  });
};

export const BillSubject: BillSubjectRelationResolvers = {
  bills: (_obj, { root }) => {
    return db.billSubject.findUnique({ where: { id: root?.id } }).bills();
  },
};
