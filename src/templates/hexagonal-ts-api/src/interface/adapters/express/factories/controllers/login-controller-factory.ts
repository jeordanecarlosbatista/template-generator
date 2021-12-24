import { Controller } from '@interface/api/rest';
import { LoginController } from '@interface/adapters/express/controllers';
import { makeDbAuthentication, makeLoginValidation, makeLogControllerDecorator } from '../../factories';

export const makeLoginController = (): Controller => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return makeLogControllerDecorator(controller);
};
