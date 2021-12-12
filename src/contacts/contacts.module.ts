import { Module } from '@nestjs/common'
import { ContactsService } from './contacts.service'
import { ContactsController } from './contacts.controller'
import { OrganizationsService } from '../organizations/organizations.service'

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, OrganizationsService],
})
export class ContactsModule {}
