import { expect, test, describe } from "@jest/globals";

describe("Running tests in Test environment", () => {
  test("Node Env", () => {
    expect(process.env.NODE_ENV).toBe("test");
  });

  test("Database environment variables", () => {
    expect(process.env.DATABASE_URL).toBeDefined();
  });
});
