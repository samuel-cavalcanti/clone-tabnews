export class CustomError extends Error {
  constructor({ name, message, action, statusCode, cause }) {
    super(message, { cause });
    this.name = name;
    this.statusCode = statusCode;
    this.action = action;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}

export class InternalServerError extends CustomError {
  constructor({ cause }) {
    super({
      message: "Um erro interno não esperado aconteceu.",
      name: "Internal Server Error",
      statusCode: 500,
      action: "entre em contato com o suporte",
      cause,
    });
  }
}

export class MethodNotAllowedError extends CustomError {
  constructor() {
    super({
      message: "Método não permitido para esse END point",
      name: "Method Not Allowed",
      statusCode: 405,
      action: "verifique se o método HTTP utilizado é valido",
    });
  }
}

export class ServiceUnavailableError extends CustomError {
  constructor({ cause, service }) {
    super({
      message: `${service} está apresentando falha ou está indisponível`,
      cause,
      name: "Service Unavailable",
      statusCode: 503,
      action: "entre em contato com o suporte",
    });
  }
}

export class ValidationError extends CustomError {
  constructor({ cause, message, action }) {
    super({
      message: message || "Erro de validação aconteceu",
      cause,
      name: "Validation Error",
      action: action || "Ajuste os dados enviados e tente novamente.",
      statusCode: 400,
    });
  }
}
