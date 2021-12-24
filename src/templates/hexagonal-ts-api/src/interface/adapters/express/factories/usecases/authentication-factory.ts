import { AccountPostgresRepository } from '@infrastructure/adapters/postgresql';
import { BcryptAdapter, JwtAdapter } from '@infrastructure/adapters/cryptography';
import { DbAuthentication } from '@core/adapters/db-authentication';
import { Authentication } from '@core/use-cases';
import env from '@interface/adapters/express/config/env';

export const makeDbAuthentication = (): Authentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbAuthentication(accountPostgresRepository, bcryptAdapter, jwtAdapter, accountPostgresRepository);
};
