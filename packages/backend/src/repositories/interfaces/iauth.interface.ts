import { Account } from 'src/database/entities/account.entity';

export interface IAUTH {
  getCredentials(email: string): Promise<Account | null>;
}
