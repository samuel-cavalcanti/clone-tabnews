import pgMigrate from "node-pg-migrate";
import { join } from "node:path";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {NextApiRequest} request
 * @param {NextApiResponse} response
 */
export default async function migrations(request, response) {
  const defualtMigrateConfig = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const dryRunMigrations = await pgMigrate(defualtMigrateConfig);
    return response.status(200).json(dryRunMigrations);
  }

  if (request.method === "POST") {
    const liveRunMigrations = await pgMigrate({
      ...defualtMigrateConfig,
      dryRun: false,
    });
    const status = liveRunMigrations.length > 0 ? 201 : 200;
    return response.status(status).json(liveRunMigrations);
  }

  response.status(405).end();
}
