import { createDefaultRouter } from "infra/router";
import { runMigrations } from "models/migrator";


/**
 * @param request {import('next/server').NextRequest}
 * @param response {import('next/server').NextResponse}
 */
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
