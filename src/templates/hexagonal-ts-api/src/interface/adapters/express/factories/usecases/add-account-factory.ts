import { DbAddAccount } from '@core/adapters';
import { AddAccount } from '@core/use-cases';
import { AccountPostgresRepository } from '@infrastructure/adapters/postgresql';
import { BcryptAdapter } from '@infrastructure/adapters/cryptography';

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountPostgresRepository();
  return new DbAddAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
