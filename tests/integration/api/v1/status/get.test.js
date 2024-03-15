test("GET to /api/v1/status should be 200 (OK)", async () => {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/status`);
  const body = await response.json();
  const psVersion = "16.0";
  const psMaxConnections = 100;
  const psNumberOfConnections = 1;
  const today = new Date(body.updated_at).toISOString();

  const { database } = body.dependencies;

  expect(response.status).toBe(200);
  expect(today).toBe(body.updated_at);
  expect(database.version).toBe(psVersion);
  expect(database.max_connections).toBe(psMaxConnections);
  expect(database.number_of_connections).toBe(psNumberOfConnections);
});
