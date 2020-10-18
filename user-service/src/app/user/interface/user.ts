import { Document } from 'mongoose';
import { Role } from '../dto/user.dto';
export interface User extends Document {
  readonly email: string;
  readonly phone: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly displayName: string;
  readonly photoUrl?: string;
  readonly is_active: boolean;
  readonly emailVerified: boolean;
  readonly is_disabled: boolean;
}
