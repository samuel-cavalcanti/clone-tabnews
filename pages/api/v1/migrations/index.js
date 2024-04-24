import pgMigrate from "node-pg-migrate";
import { join } from "node:path";
import { NextApiRequest, NextApiResponse } from "next";
import database from "infra/database";

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 */
export default async function migrations(request, response) {
  const isDryRun = { POST: false, GET: true };
  const dryRun = isDryRun[request.method];

  if (dryRun === undefined) return response.status(405).end();

  const migrations = await database.withClient(async (client) => {
    return pgMigrate({
      dbClient: client,
      dryRun,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
  });

  const status = migrations.length > 0 && !dryRun ? 201 : 200;

  return response.status(status).json(migrations);
}
