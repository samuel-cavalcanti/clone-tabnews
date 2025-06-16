import { createDefaultRouter } from "infra/router";
import { runMigrations } from "models/migrator";

async function migrations(request, response) {
  const isDryRun = { POST: false, GET: true };
  const dryRun = isDryRun[request.method];

  const migrations = await runMigrations(dryRun);

  const status = migrations.length > 0 && !dryRun ? 201 : 200;

  return response.status(status).json(migrations);
}

const router = createDefaultRouter();

router.get(migrations).post(migrations);
export default router.handler();
