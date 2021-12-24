import { LogErrorRepository } from '@infrastructure/db/log';
import { Controller, HttpResponse } from '@interface/api/rest';

export class LogControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository,
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(request);
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack);
    }
    return httpResponse;
  }
}
