import { createDefaultRouter } from "infra/router";
import userModel from "models/user";

/**
 * @param request {import('next').NextApiRequest}
 * @param response {import('next').NextApiResponse}
 */
async function createUser(request, response) {
  const userInputValues = request.body;
  const newUser = await userModel.create(userInputValues);

  response.status(201).json({
    username: newUser.username,
    email: newUser.email,
    created_at: newUser.created_at,
    updated_at: newUser.updated_at,
  });
}

const router = createDefaultRouter();
router.post(createUser);
export default router.handler();
