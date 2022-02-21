import { ServerError } from '../errors';
import { HttpResponse } from '../protocols';

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
