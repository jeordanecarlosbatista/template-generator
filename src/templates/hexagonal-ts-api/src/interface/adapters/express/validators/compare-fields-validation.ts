import { InvalidParamError } from '@interface/adapters/express/errors';
import { Validation } from '@interface/api/rest';

export class CompareFieldsValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldToCompareName: string,
  ) {}

  // eslint-disable-next-line consistent-return
  validate(input: any): any {
    if (input[this.fieldName] !== input[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName);
    }
  }
}
