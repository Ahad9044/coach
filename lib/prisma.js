import { PrismaClient } from "@prisma/client";

function initPrismaClient() {
  if (!process.env.DATABASE_URL) {
    // Important: don't crash builds just because a module was imported.
    // Instead fail *when* the DB is actually used, with a clear message.
    const err = new Error(
      "DATABASE_URL is not set. Configure it in your deployment environment variables."
    );
    err.name = "MissingDatabaseUrlError";
    throw err;
  }

  const client = globalThis.prisma || new PrismaClient();

  if (process.env.NODE_ENV !== "production") {
    globalThis.prisma = client;
  }

  return client;
}

let _db;

export const db = new Proxy(
  {},
  {
    get(_target, prop) {
      if (!_db) _db = initPrismaClient();
      // eslint-disable-next-line no-unsafe-return
      return _db[prop];
    },
  }
);

// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.