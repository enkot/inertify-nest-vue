import { IsEmail, IsBoolean, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsEmail()
  email: string

  @IsNotEmpty()
  password: string

  @IsBoolean()
  owner?: boolean
  photo?: string
}
