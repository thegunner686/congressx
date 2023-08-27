import type { QueryResolvers, MutationResolvers } from "types/graphql";

import { db } from "src/lib/db";
import {
  getAllRepresentatives,
  getStartYearAndChamber,
} from "src/lib/congress-api";

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

export const populateRepresentatives = async () => {
  const representatives = await getAllRepresentatives();

  return representatives
    .map((rep) => {
      const { inactive, startYear, chamber } = getStartYearAndChamber(rep);
      return {
        rep,
        inactive,
        startYear,
        chamber,
      };
    })
    .filter(({ inactive }) => !inactive)
    .map(({ rep, startYear, chamber }) => {
      return {
        id: rep.bioguideId,
        imageUrl: rep.depiction?.imageUrl ?? "",
        invertedOrderName: rep.name,
        partyName: rep.partyName,
        startYear,
        state: rep.state,
        district: rep.district,
        currentChamber: chamber,
      };
    });
};
