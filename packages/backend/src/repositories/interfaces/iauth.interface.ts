import { AuthInfo } from 'src/database/entities/auth-info.interface';

export interface IAUTH {
  getCredentials(email: string): Promise<AuthInfo | null>;
}
