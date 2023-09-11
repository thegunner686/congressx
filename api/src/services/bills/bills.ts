import type {
  QueryResolvers,
  MutationResolvers,
  BillRelationResolvers,
} from "types/graphql";

import { db } from "src/lib/db";

export const bills: QueryResolvers["bills"] = () => {
  return db.bill.findMany();
};

export const searchBillsByTitle: QueryResolvers["bills"] = ({
  searchText,
  order,
  subjectId,
}) => {
  if (
    ((searchText == null || searchText.trim().length == 0) &&
      subjectId == null) ||
    subjectId.trim().length == 0
  ) {
    return db.bill.findMany({
      orderBy: [
        {
          introducedDate: order,
        },
      ],
      take: 5,
    });
  } else if (subjectId && subjectId.trim().length > 0) {
    return db.bill.findMany({
      orderBy: [
        {
          introducedDate: order,
        },
      ],
      where: {
        legislativeSubjects: {
          some: {
            id: subjectId,
          },
        },
      },
      take: 5,
    });
  }
  if (subjectId == null || subjectId.trim().length == 0) {
    return db.bill.findMany({
      orderBy: [
        {
          introducedDate: order,
        },
      ],
      where: {
        title: {
          search: searchText,
        },
      },
      take: 5,
    });
  }

  return db.bill.findMany({
    orderBy: [
      {
        introducedDate: order,
      },
    ],
    where: {
      AND: [
        {
          title: {
            search: searchText,
          },
        },
        {
          legislativeSubjects: {
            some: {
              id: subjectId,
            },
          },
        },
      ],
    },
    take: 5,
  });
};

export const bill: QueryResolvers["bill"] = ({ id }) => {
  return db.bill.findUnique({
    where: { id },
  });
};

export const createBill: MutationResolvers["createBill"] = ({ input }) => {
  return db.bill.create({
    data: input,
  });
};

export const updateBill: MutationResolvers["updateBill"] = ({ id, input }) => {
  return db.bill.update({
    data: input,
    where: { id },
  });
};

export const deleteBill: MutationResolvers["deleteBill"] = ({ id }) => {
  return db.bill.delete({
    where: { id },
  });
};

export const Bill: BillRelationResolvers = {
  congress: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).congress();
  },
  userVotes: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).userVotes();
  },
  votings: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).votings();
  },
  actions: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).actions();
  },
  summaries: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).summaries();
  },
  textVersions: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).textVersions();
  },
  legislativeSubjects: (_obj, { root }) => {
    return db.bill
      .findUnique({ where: { id: root?.id } })
      .legislativeSubjects();
  },
  sponsors: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).sponsors();
  },
  cosponsors: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).cosponsors();
  },
  comments: (_obj, { root }) => {
    return db.bill.findUnique({ where: { id: root?.id } }).comments();
  },
};
