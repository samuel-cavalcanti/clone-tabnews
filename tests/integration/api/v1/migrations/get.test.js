import { expect, test, describe } from "@jest/globals";

describe("Running pending migrations in dryrun mode", () => {
  describe("Anonymous user", () => {
    test("GET /api/v1/migrations", async () => {
      const baseUrl = "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/v1/migrations`);

      expect(response.status).toBe(200);
      const body = await response.json();

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThan(0);
    });
  });
});

