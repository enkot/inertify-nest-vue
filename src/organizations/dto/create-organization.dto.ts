import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator'

export class CreateOrganizationDto {
  accountId: number

  @IsNotEmpty()
  name: string

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
