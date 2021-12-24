import {
  serverError, ok,
} from '@presentation/helpers';
import { Controller, HttpResponse } from '@presentation/protocols';

export class HealthCheckController implements Controller {
  async handle(request: HealthCheckController.Request): Promise<HttpResponse> {
    try {
      return ok(true);
    } catch (error) {
      return serverError(error as Error);
    }
  }
}

export namespace HealthCheckController {
  export type Request = {};
}
