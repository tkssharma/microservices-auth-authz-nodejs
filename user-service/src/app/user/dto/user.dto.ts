import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';
import { IsDefined } from 'class-validator';

export class CreateUserDTO {

  @ApiProperty({description: 'email of a user'})
  @IsDefined()
  @IsString()
  @IsEmail()
  readonly email: string;

  @ApiProperty({description: 'phone of a user'})
  @IsDefined()
  readonly phone: string;

  @ApiProperty({description: 'firstName of a user'})
  @IsDefined()
  @IsString()
  readonly firstName: string;

  @ApiProperty({description: 'lastName of a user'})
  @IsDefined()
  @IsString()
  readonly lastName: string;

  @IsDefined()
  @IsString()
  readonly displayName: string;

  readonly photoUrl?: string;
  readonly is_active: boolean;
  readonly emailVerified: boolean;
  readonly is_disabled: boolean;
}
