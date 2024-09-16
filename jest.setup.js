const orch = require("./infra/scripts/orchestrator");

beforeAll(async () => {
  await orch.waitServices();
  await orch.clearDB();
});
