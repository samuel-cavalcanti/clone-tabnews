test("POST to /api/v1/migrations should be 200 (OK)", async () => {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/migrations`, {
    method: "POST",
  });

  expect(response.status).toBe(200);
  const body = await response.json();

  console.log(body);

  expect(Array.isArray(body)).toBe(true);
});
