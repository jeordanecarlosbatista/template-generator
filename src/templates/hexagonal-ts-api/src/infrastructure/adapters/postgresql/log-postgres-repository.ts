import { LogErrorRepository } from '@infrastructure/db/log';
import { PostgresHelper } from '.';

export class LogPostgresRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    try {
      await PostgresHelper.client.log.create({ data: { stack } });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  }
}
