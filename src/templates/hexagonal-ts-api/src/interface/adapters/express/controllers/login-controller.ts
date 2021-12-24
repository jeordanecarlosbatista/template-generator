import { Authentication } from '@core/use-cases';
import { Controller, HttpResponse, Validation } from '@interface/api/rest';
import {
  badRequest, serverError, unauthorized, ok,
} from '@interface/adapters/express/http-helper';

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation,
  ) {}

  async handle(request: LoginController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const authenticationModel = await this.authentication.auth(request);
      if (!authenticationModel) {
        return unauthorized();
      }
      return ok(authenticationModel);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}
