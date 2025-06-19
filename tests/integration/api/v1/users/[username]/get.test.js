import { expect, test, describe } from "@jest/globals";
import orch from "infra/scripts/orchestrator";

beforeAll(() => orch.waitMigrations());

describe("GET /api/v1/users/[username]", () => {
  function toDate(dateString) {
    const date = Date.parse(dateString);
    const formatter = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return formatter.format(date);
  }

  function changeUserDateFormat(user) {
    return {
      ...user,
      updated_at: toDate(user.updated_at),
      created_at: toDate(user.created_at),
    };
  }
  const TODAY = toDate(new Date().toString());

  describe("Anonymous user", () => {
    const baseUrl = "http://localhost:3000";

    const getUser = (user) => fetch(`${baseUrl}/api/v1/users/${user.username}`);

    async function getUsers(users) {
      const results = [];
      for (const user of users) {
        let response = await getUser(user);
        results.push(await response.json());
      }

      return results;
    }

    const postUser = (user) =>
      fetch(`${baseUrl}/api/v1/users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

    test("with exact case match", async () => {
      const userInputValues = {
        username: "samuel-cavalcanti",
        email: "test212@gmail.com",
        password: "123456",
      };

      const postResponse = await postUser(userInputValues);
      const createdUser = await postResponse.json();

      expect(postResponse.status).toBe(201);
      const response = await getUser(userInputValues);
      expect(response.status).toBe(200);
      const recivedUser = await response.json();

      expect(recivedUser).toEqual(createdUser);
    });

    test("with case noneexistent username", async () => {
      const userInputValues = {
        username: "mismath",
      };

      const response = await getUser(userInputValues);
      expect(response.status).toBe(404);
      const recivedError = await response.json();

      expect(recivedError).toEqual({
        name: "Not Found Error",
        message: `O username: ${userInputValues.username} não foi encontrado`,
        action: "Verifique se o username está digitado corretamente",
        status_code: 404,
      });
    });
  });
});
