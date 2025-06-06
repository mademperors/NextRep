import * as bcrypt from 'bcrypt';

export async function encodePassword(password: string): Promise<string> {
  const SALT = bcrypt.genSaltSync();
  const hash = await bcrypt.hash(password, SALT);
  return hash;
}

export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
