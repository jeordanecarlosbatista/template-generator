import { Middleware, HttpResponse } from '@interface/api/rest';
import { forbidden, ok, serverError } from '@interface/adapters/express/http-helper';
import { AccessDeniedError } from '@interface/adapters/express/errors';
import { LoadAccountByToken } from '@core/use-cases';

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string,
  ) {}

  async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
    try {
      const { accessToken } = request;
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken, this.role);
        if (account) {
          return ok({ accountId: account.id });
        }
      }
      return forbidden(new AccessDeniedError());
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
