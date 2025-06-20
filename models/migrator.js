import { resolve } from "node:path";
import database from "infra/database";
import pgMigrate from "node-pg-migrate";
async function runMigrations(dryRun) {
  const migrations = await database.withClient((client) => {
    return pgMigrate({
      dbClient: client,
      dryRun,
      dir: resolve("infra", "migrations"),
      direction: "up",
      verbose: true,
      log: () => {},
      migrationsTable: "pgmigrations",
    });
  });

  return migrations;
}

export { runMigrations };
