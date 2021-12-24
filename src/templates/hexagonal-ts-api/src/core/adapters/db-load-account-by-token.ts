import { LoadAccountByTokenRepository } from '@infrastructure/db/account';
import { Decrypter } from '@infrastructure/cryptography/decrypter';
import { LoadAccountByToken } from '../use-cases';

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor(
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string): Promise<LoadAccountByToken.Result | any> {
    let token: string;
    try {
      token = await this.decrypter.decrypt(accessToken);
    } catch (error) {
      return null;
    }
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role);
      if (account) {
        return account;
      }
    }
    return null;
  }
}
