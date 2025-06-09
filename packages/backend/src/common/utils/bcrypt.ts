import * as bcrypt from 'bcrypt';

export function encodePassword(password: string): string {
  const SALT = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, SALT);
  return hash;
}

export function comparePasswords(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}
