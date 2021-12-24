import { LoadAccountByToken } from '@core/use-cases';
import { DbLoadAccountByToken } from '@core/adapters';
import { AccountPostgresRepository } from '@infrastructure/adapters/postgresql';
import { JwtAdapter } from '@infrastructure/adapters/cryptography';
import env from '@interface/adapters/express/config/env';

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountPostgresRepository);
};
