import database from "infra/database.js";
import { expect, test } from "@jest/globals";

const cleanDB = () =>
  database.query("drop schema public cascade; create schema public;");

beforeAll(async () => {
  await cleanDB();
});

test("POST to /api/v1/migrations should be 200 (OK)", async () => {
  const baseUrl = "http://localhost:3000";

  const postMigrations = () =>
    fetch(`${baseUrl}/api/v1/migrations`, {
      method: "POST",
    });

  const requests = [postMigrations, postMigrations];
  const especs = [
    { status: 201, length: 1 },
    { status: 200, length: 0 },
  ];

  for (const index of [0, 1]) {
    const request = requests[index];
    const expected = especs[index];
    const response = await request();
    expect(response.status).toBe(expected.status);
    const body = await response.json();

    expect(Array.isArray(body)).toBe(true);
    expect(body.length).toBe(expected.length);
  }
});
