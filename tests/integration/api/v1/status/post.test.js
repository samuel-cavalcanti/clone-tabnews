import { expect, test, describe } from "@jest/globals";

describe("Retriving current system status", () => {
  describe("Anonymous user", () => {
    test("POST /api/v1/status", async () => {
      const baseUrl = "http://localhost:3000";
      const response = await fetch(`${baseUrl}/api/v1/status`, {
        method: "POST",
      });

      expect(response.status).toBe(405);
      const error = await response.json();
      expect(error.name).toBe("Method Not Allowed");
      expect(error.message).toBe("Método não permitido para esse END point");
      expect(error.action).toBe(
        "verifique se o método HTTP utilizado é valido",
      );
      expect(error.status_code).toBe(405);
    });
  });
});
