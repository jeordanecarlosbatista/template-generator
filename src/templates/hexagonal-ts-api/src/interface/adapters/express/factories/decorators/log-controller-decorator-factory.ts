import { LogPostgresRepository } from '@infrastructure/adapters/postgresql';
import { Controller } from '@interface/api/rest';
import { LogControllerDecorator } from '../../decorators';

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogPostgresRepository();

  return new LogControllerDecorator(controller, logMongoRepository);
};
