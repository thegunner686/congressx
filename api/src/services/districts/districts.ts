import type {
  QueryResolvers,
  MutationResolvers,
  DistrictRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const districts: QueryResolvers["districts"] = () => {
  return db.district.findMany();
};

export const district: QueryResolvers["district"] = ({ id }) => {
  return db.district.findUnique({
    where: { id },
  });
};

export const createDistrict: MutationResolvers["createDistrict"] = ({
  input,
}) => {
  return db.district.create({
    data: input,
  });
};

export const updateDistrict: MutationResolvers["updateDistrict"] = ({
  id,
  input,
}) => {
  return db.district.update({
    data: input,
    where: { id },
  });
};

export const deleteDistrict: MutationResolvers["deleteDistrict"] = ({ id }) => {
  return db.district.delete({
    where: { id },
  });
};

export const District: DistrictRelationResolvers = {
  state: (_obj, { root }) => {
    return db.district.findUnique({ where: { id: root?.id } }).state();
  },
  representative: (_obj, { root }) => {
    return db.district.findUnique({ where: { id: root?.id } }).representative();
  },
  residents: (_obj, { root }) => {
    return db.district.findUnique({ where: { id: root?.id } }).residents();
  },
  polls: (_obj, { root }) => {
    return db.district.findUnique({ where: { id: root?.id } }).polls();
  },
};
