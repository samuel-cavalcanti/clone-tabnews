import database from "infra/database.js";
import { InternalServerError } from "infra/error/errors";

export default async function status(_request, response) {
  try {
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
  } catch (error) {
    const publicError = new InternalServerError({ cause: error });
    console.log(publicError);
    response.status(500).json(publicError);
  }
}
