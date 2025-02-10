import database from "infra/database.js";
import { createDefaultRouter } from "infra/router";

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

const router = createDefaultRouter();

router.get(status);
export default router.handler();
