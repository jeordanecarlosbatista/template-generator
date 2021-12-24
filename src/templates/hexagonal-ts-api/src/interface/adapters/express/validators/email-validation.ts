import { Validation } from '@interface/api/rest';
import { InvalidParamError } from '@interface/adapters/express/errors';
import { EmailValidator } from '@interface/api/rest/email-validator';

export class EmailValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator,
  ) {}

  // eslint-disable-next-line consistent-return
  validate(input: any): any {
    const isValid = this.emailValidator.isValid(input[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
