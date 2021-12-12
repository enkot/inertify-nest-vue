import { PartialType } from '@nestjs/mapped-types'
import { CreateContactDto } from './create-Contact.dto'

export class UpdateContactDto extends PartialType(CreateContactDto) {}
