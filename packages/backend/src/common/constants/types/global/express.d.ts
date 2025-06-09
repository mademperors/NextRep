import { UserPayload } from '../user-payload.interface';

declare global {
  namespace Express {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface User extends UserPayload {}
  }
}
