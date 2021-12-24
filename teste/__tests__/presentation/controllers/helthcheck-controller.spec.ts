import { HealthCheckController } from '@presentation/controllers';
import { ok } from '@presentation/helpers';

type SutTypes = {
  sut: HealthCheckController
}

const makeSut = (): SutTypes => {
  const sut = new HealthCheckController();
  return {
    sut,
  };
};

describe('HealthCheck Controller', () => {
  test('Should return 200 if return data helth', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(true));
  });
});
