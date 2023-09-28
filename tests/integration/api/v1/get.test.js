test("GET to /api/v1/status should be 200 (OK)", async () => {
  const baseUrl = "http://localhost:3000"
  const response = await fetch(`${baseUrl}/api/v1/status`);

  expect(response.status).toBe(200);
});
