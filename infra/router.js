import { createRouter } from "next-connect";

import { InternalServerError, MethodNotAllowedError } from "infra/error/errors";

export function createDefaultRouter() {
  const routers = createRouter();

  function onNoMatchHandler(_request, response) {
    const error = new MethodNotAllowedError();

    response.status(error.statusCode).json(error);
  }

  function onErrorHandler(error, _request, response) {
    const publicError = new InternalServerError({ cause: error });
    response.status(publicError.statusCode).json(publicError);
  }

  const defaultOps = {
    onNoMatch: onNoMatchHandler,
    onError: onErrorHandler,
  };

  return {
    get: (handler) => routers.get(handler),
    post: (handler) => routers.post(handler),
    handler: (ops) => routers.handler({ ...defaultOps, ops }),
  };
}
