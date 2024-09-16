import { expect, test, describe } from "@jest/globals";

describe("NOT Allowed methods /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("DELETE /api/v1/migrations", async () => {
      const baseUrl = "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/v1/migrations/`, {
        method: "DELETE",
      });

      const json = await response.json();

      expect(response.status).toBe(405);
      expect(json.error).toBe(`Method "DELETE" not allowed`);
    });
  });
});
