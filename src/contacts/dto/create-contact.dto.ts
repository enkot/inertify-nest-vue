import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateContactDto {
  accountId: number
  organizationId?: number

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsEmail()
  @IsOptional()
  email?: string

  phone?: string
  address?: string
  city?: string
  region?: string
  country?: string
  postalCode?: string
}
