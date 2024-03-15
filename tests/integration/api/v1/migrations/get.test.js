
test("GET to /api/v1/migrations should be 200 (OK)", async () => {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/migrations`);

  expect(response.status).toBe(200);
  console.log(body);
});
