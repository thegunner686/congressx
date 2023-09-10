// import type { Prisma } from "@prisma/client";
// import { db } from "api/src/lib/db";
import { indexAllRepresentatives } from "api/src/lib/crawl";
import { indexAllBills, indexBill, indexVoting } from "api/src/lib/indexBills";
export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //

    // No need to do this anymore -- all indexed
    // await indexAllRepresentatives();

    // await indexBill({ number: 1450 })
    // await indexAllBills()

    await indexVoting();
  } catch (error) {
    console.warn("Please define your seed data.");
    console.error(error);
  }
};
