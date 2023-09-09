import type {
  QueryResolvers,
  MutationResolvers,
  PartyAffiliationRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const partyAffiliations: QueryResolvers["partyAffiliations"] = () => {
  return db.partyAffiliation.findMany();
};

export const partyAffiliation: QueryResolvers["partyAffiliation"] = ({
  id,
}) => {
  return db.partyAffiliation.findUnique({
    where: { id },
  });
};

export const createPartyAffiliation: MutationResolvers["createPartyAffiliation"] =
  ({ input }) => {
    return db.partyAffiliation.create({
      data: input,
    });
  };

export const updatePartyAffiliation: MutationResolvers["updatePartyAffiliation"] =
  ({ id, input }) => {
    return db.partyAffiliation.update({
      data: input,
      where: { id },
    });
  };

export const deletePartyAffiliation: MutationResolvers["deletePartyAffiliation"] =
  ({ id }) => {
    return db.partyAffiliation.delete({
      where: { id },
    });
  };

export const PartyAffiliation: PartyAffiliationRelationResolvers = {
  representative: (_obj, { root }) => {
    return db.partyAffiliation
      .findUnique({ where: { id: root?.id } })
      .representative();
  },
  party: (_obj, { root }) => {
    return db.partyAffiliation.findUnique({ where: { id: root?.id } }).party();
  },
};
