import pgMigrate from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database";
import { createRouter } from "next-connect";
import { InternalServerError, MethodNotAllowedError } from "infra/error/errors";

async function migrations(request, response) {
  const isDryRun = { POST: false, GET: true };
  const dryRun = isDryRun[request.method];

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

function onNoMatchHandler(_request, response) {
  const error = new MethodNotAllowedError();

  response.status(error.statusCode).json(error);
}

function onErrorHandler(error, _request, response) {
  const publicError = new InternalServerError({ cause: error });
  console.error("Internal Error on status", publicError);
  response.status(publicError.statusCode).json(publicError);
}

const router = createRouter();

router.get(migrations).post(migrations);
export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});
