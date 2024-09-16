import database from "infra/database.js";
import { expect, test, describe } from "@jest/globals";

const cleanDB = () =>
  database.query("drop schema public cascade; create schema public;");

beforeAll(async () => {
  await cleanDB();
});

describe("Running pending migrations", () => {
  describe("Anonymous user", () => {
    const baseUrl = "http://localhost:3000";

    const postMigrations = () =>
      fetch(`${baseUrl}/api/v1/migrations`, {
        method: "POST",
      });

    test("for the first time", async () => {
      const response = await postMigrations();
      expect(response.status).toBe(201);

      const body = await response.json();

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(1);
    });

    test("For the second time", async () => {
      const response = await postMigrations();
      expect(response.status).toBe(200);

      const body = await response.json();

      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBe(0);
    });
  });
});
