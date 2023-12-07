export type ErrorName =
  | "UPDATE_ERROR"
  | "DELETE_ERROR"
  | "GET_ERROR"
  | "CREATE_ERROR";

export class ApplicationError extends Error {
  name: ErrorName;
  statusCode: number;
  constructor(message: string, statusCode: number, name: ErrorName) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, ApplicationError.prototype);
  }
}
