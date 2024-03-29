import database from "infra/database.js";
import { expect, test } from "@jest/globals";

const cleanDB = () =>
  database.query("drop schema public cascade; create schema public;");

function checkEnv() {
  expect(process.env.NODE_ENV).toBe("test");
  expect(process.env.DATABASE_URL).toBeDefined();
}

beforeAll(async () => {
  checkEnv();
  await cleanDB();
});




test("GET to /api/v1/migrations should be 200 (OK)", async () => {
  const baseUrl = "http://localhost:3000";
  const response = await fetch(`${baseUrl}/api/v1/migrations`);

  expect(response.status).toBe(200);
  const body = await response.json();

  expect(Array.isArray(body)).toBe(true);
  expect(body.length).toBeGreaterThan(0);
});
