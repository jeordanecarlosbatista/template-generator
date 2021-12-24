import { Controller, HttpResponse, Validation } from '@interface/api/rest';
import {
  badRequest, serverError, forbidden, created,
} from '@interface/adapters/express/http-helper';
import { EmailInUseError } from '@interface/adapters/express/errors';
import { AddAccount, Authentication } from '@core/use-cases';

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication,
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request);
      if (error) {
        return badRequest(error);
      }
      const { name, email, password } = request;
      const isValid = await this.addAccount.add({
        name,
        email,
        password,
      });
      if (!isValid) {
        return forbidden(new EmailInUseError());
      }
      const authenticationModel = await this.authentication.auth({
        email,
        password,
      });
      return created(authenticationModel);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export namespace SignUpController {
  export type Request = {
    name: string
    email: string
    password: string
  }
}
