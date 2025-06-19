import { expect, test, describe } from "@jest/globals";
import orch from "infra/scripts/orchestrator";

beforeAll(() => orch.waitMigrations());

describe("POST /api/v1/users", () => {
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

    const postUser = (user) =>
      fetch(`${baseUrl}/api/v1/users`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(user),
      });

    async function postUsers(users) {
      const results = [];
      for (const user of users) {
        let response = await postUser(user);
        results.push(await response.json());
      }

      return results;
    }

    test("With unique and valid data", async () => {
      const user = {
        username: "samuel-cavalcanti",
        email: "test212@gmail.com",
        password: "123456",
      };
      const res = await postUser(user);

      const createdUser = changeUserDateFormat(await res.json());

      expect(res.status).toBe(201);
      expect(createdUser).toEqual({
        username: user.username,
        email: user.email,
        created_at: TODAY,
        updated_at: TODAY,
      });
    });

    test("Invalid data: same email", async () => {
      const validUser = {
        username: "samuel-cavalcanti2",
        email: "test213@gmail.com",
        password: "123456",
      };
      const users = [
        validUser,
        {
          username: "Samuel",
          email: "Test213@gmail.com",
          password: "123456",
        },
      ];

      const [createdUser, emailError] = await postUsers(users);

      expect(changeUserDateFormat(createdUser)).toEqual({
        username: validUser.username,
        email: validUser.email,
        updated_at: TODAY,
        created_at: TODAY,
      });

      expect(emailError).toEqual({
        name: "Validation Error",
        message:
          'Não foi possível inserir um novo usuário no banco, motivo: error: duplicate key value violates unique constraint "users_email_key"',
        action: "Ajuste os dados enviados e tente novamente.",
        status_code: 400,
      });
    });

    test("Invalid data: same username", async () => {
      const users = [
        {
          username: "samuel2",
          email: "test2@gmail.com",
          password: "123456",
        },
        {
          username: "samuel2",
          email: "Test3@gmail.com",
          password: "123456",
        },
      ];

      const [createdUser, userNameError] = await postUsers(users);

      expect(changeUserDateFormat(createdUser)).toEqual({
        username: "samuel2",
        email: "test2@gmail.com",
        updated_at: TODAY,
        created_at: TODAY,
      });

      expect(userNameError).toEqual({
        name: "Validation Error",
        message:
          'Não foi possível inserir um novo usuário no banco, motivo: error: duplicate key value violates unique constraint "users_username_key"',
        action: "Ajuste os dados enviados e tente novamente.",
        status_code: 400,
      });
    });
  });
});
