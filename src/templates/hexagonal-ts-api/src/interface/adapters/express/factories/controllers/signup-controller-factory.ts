import { SignUpController } from '@interface/adapters/express/controllers';
import { Controller } from '@interface/api/rest';
import {
  makeDbAuthentication, makeSignUpValidation, makeLogControllerDecorator, makeDbAddAccount,
} from '../../factories';

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication());
  return makeLogControllerDecorator(controller);
};
