import {
  LoadAccountByEmailRepository, UpdateAccessTokenRepository,
} from '@infrastructure/db/account';
import { HashComparer, Encrypter } from '@infrastructure/cryptography';
import { Authentication } from '../use-cases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
  ) {}

  async auth(authenticationParams: Authentication.Params): Promise<Authentication.Result | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authenticationParams.email);
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password);
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id.toString());
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
        return {
          accessToken,
          name: account.name,
        };
      }
    }
    return null;
  }
}
