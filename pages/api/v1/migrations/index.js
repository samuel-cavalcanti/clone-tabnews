import pgMigrate from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";

export default async function migrations(request, response) {
  const isDryRun = { POST: false, GET: true };
  const dryRun = isDryRun[request.method];

  if (dryRun === undefined)
    return response
      .status(405)
      .json({ error: `Method "${request.method}" not allowed` });

  const migrations = await database.withClient((client) => {
    return pgMigrate({
      dbClient: client,
      dryRun,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    });
  });

  const status = migrations.length > 0 && !dryRun ? 201 : 200;

  return response.status(status).json(migrations);
}
