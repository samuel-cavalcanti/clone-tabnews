import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/error/errors";
import { createRouter } from "next-connect";

async function status(_request, response) {
  const settings = await database.settings();
  const updatedAt = new Date();

  response.status(200).json({
    updated_at: updatedAt.toISOString(),
    dependencies: {
      database: {
        version: settings.version,
        max_connections: settings.maxConnections,
        number_of_connections: settings.numberOfConnections,
      },
    },
  });
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

router.get(status);
export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});
