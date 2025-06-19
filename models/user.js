import database from "infra/database";
import { NotFoundError, ValidationError } from "infra/error/errors";

async function create(userInputValues) {
  const newUser = await insertUserToDB(userInputValues);
  return newUser;
}
async function findUserByUsername(username) {
  const results = await database.query({
    text: `SELECT 
                username, email, created_at, updated_at 
             FROM users 
             WHERE 
                    username = $1
             LIMIT 1
             ;`,
    values: [username],
  });

  if (results.rowCount == 0)
    throw new NotFoundError({
      message: `O username: ${username} não foi encontrado`,
      action: "Verifique se o username está digitado corretamente",
    });
  return results.rows[0];
}

async function insertUserToDB(user) {
  try {
    const results = await database.query({
      text: `INSERT INTO
              users (username, email, password)
             VALUES 
                    ($1, LOWER($2),$3)
             RETURNING 
              username, email, created_at, updated_at;`,
      values: [user.username, user.email, user.password],
    });

    return results.rows[0];
  } catch (e) {
    throw new ValidationError({
      message: `Não foi possível inserir um novo usuário no banco, motivo: ${e.cause}`,
      cause: e.cause,
    });
  }
}

const userInputValues = {
  create,
  findUserByUsername,
};
export default userInputValues;
