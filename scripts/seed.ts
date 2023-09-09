// import type { Prisma } from "@prisma/client";
// import { db } from "api/src/lib/db";
import { indexAllRepresentatives } from "api/src/lib/crawl";

export default async () => {
  try {
    //
    // Manually seed via `yarn rw prisma db seed`
    // Seeds automatically with `yarn rw prisma migrate dev` and `yarn rw prisma migrate reset`
    //

    await indexAllRepresentatives();
  } catch (error) {
    console.warn("Please define your seed data.");
    console.error(error);
  }
};
