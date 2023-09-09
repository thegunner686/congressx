import type {
  QueryResolvers,
  MutationResolvers,
  PartyRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const parties: QueryResolvers["parties"] = () => {
  return db.party.findMany();
};

export const party: QueryResolvers["party"] = ({ id }) => {
  return db.party.findUnique({
    where: { id },
  });
};

export const createParty: MutationResolvers["createParty"] = ({ input }) => {
  return db.party.create({
    data: input,
  });
};

export const updateParty: MutationResolvers["updateParty"] = ({
  id,
  input,
}) => {
  return db.party.update({
    data: input,
    where: { id },
  });
};

export const deleteParty: MutationResolvers["deleteParty"] = ({ id }) => {
  return db.party.delete({
    where: { id },
  });
};

export const Party: PartyRelationResolvers = {
  affiliations: (_obj, { root }) => {
    return db.party.findUnique({ where: { id: root?.id } }).affiliations();
  },
};
