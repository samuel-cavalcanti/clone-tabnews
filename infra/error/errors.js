export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.", { cause });
    this.name = "Internal Server Error";
    this.statusCode = 500;
    this.action = "entre em contato com o suporte";
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

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Método não permitido para esse END point");
    this.name = "Method Not Allowed";
    this.statusCode = 405;
    this.action = "verifique se o método HTTP utilizado é valido";
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
