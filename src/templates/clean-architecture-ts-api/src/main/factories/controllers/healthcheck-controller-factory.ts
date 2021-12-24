import { makeLogControllerDecorator } from '@main/factories';
import { HealthCheckController } from '@presentation/controllers';
import { Controller } from '@presentation/protocols';

export const makeHealthCheckController = (): Controller => {
  const controller = new HealthCheckController();
  return makeLogControllerDecorator(controller);
};
