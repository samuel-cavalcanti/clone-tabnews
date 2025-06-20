import { createDefaultRouter } from "infra/router";
import userModel from "models/user";

/**
 * @param request {import('next').NextApiRequest}
 * @param response {import('next').NextApiResponse}
 */
async function getHandler(request, response) {
  const { username } = request.query;
  const user = await userModel.findUserByUsername(username);
  response.status(200).json(user);
}

const router = createDefaultRouter();
router.get(getHandler);
export default router.handler();
