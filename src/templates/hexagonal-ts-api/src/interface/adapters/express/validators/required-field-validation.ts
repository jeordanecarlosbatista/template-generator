import { Validation } from '@interface/api/rest';
import { MissingParamError } from '../errors';

export class RequiredFieldValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  // eslint-disable-next-line consistent-return
  validate(input: any): any {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
