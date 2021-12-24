import { ValidationComposite, RequiredFieldValidation } from '@interface/adapters/express/validators';
import { Validation } from '@interface/api/rest';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
