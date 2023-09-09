import type {
  QueryResolvers,
  MutationResolvers,
  RepresentativeRelationResolvers,
} from "types/graphql";

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

export const Representative: RepresentativeRelationResolvers = {
  leadership: (_obj, { root }) => {
    return db.representative
      .findUnique({ where: { id: root?.id } })
      .leadership();
  },
  partyHistory: (_obj, { root }) => {
    return db.representative
      .findUnique({ where: { id: root?.id } })
      .partyHistory();
  },
  terms: (_obj, { root }) => {
    return db.representative.findUnique({ where: { id: root?.id } }).terms();
  },
  state: (_obj, { root }) => {
    return db.representative.findUnique({ where: { id: root?.id } }).state();
  },
  constituents: (_obj, { root }) => {
    return db.representative
      .findUnique({ where: { id: root?.id } })
      .constituents();
  },
  district: (_obj, { root }) => {
    return db.representative.findUnique({ where: { id: root?.id } }).district();
  },
  votes: (_obj, { root }) => {
    return db.representative.findUnique({ where: { id: root?.id } }).votes();
  },
  sponsoredBills: (_obj, { root }) => {
    return db.representative
      .findUnique({ where: { id: root?.id } })
      .sponsoredBills();
  },
  cosponsoredBills: (_obj, { root }) => {
    return db.representative
      .findUnique({ where: { id: root?.id } })
      .cosponsoredBills();
  },
  congresses: (_obj, { root }) => {
    return db.representative
      .findUnique({ where: { id: root?.id } })
      .congresses();
  },
};
