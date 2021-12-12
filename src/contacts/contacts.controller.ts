import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Query,
  Delete,
  UseGuards,
  Req,
  Redirect,
  UsePipes,
} from '@nestjs/common'
import { Render, Flash } from '@inertify/nest'
import { AuthGuard } from '../auth/guards/auth.guard'
import { ContactsService } from './contacts.service'
import { OrganizationsService } from '../organizations/organizations.service'
import { CreateContactDto } from './dto/create-contact.dto'
import { UpdateContactDto } from './dto/update-contact.dto'
import { ValidationPipe } from '../common/pipes/validation.pipe'

@Controller('contacts')
@UseGuards(AuthGuard)
export class ContactsController {
  constructor(
    private readonly contactsService: ContactsService,
    private readonly organizationsService: OrganizationsService,
  ) {}

  @Get()
  @Render('Contacts/Index')
  async index(@Req() req, @Query('page') page, @Query('search') search) {
    return {
      filters: {
        search,
      },
      contacts: await this.contactsService.findAll({
        page,
        where: {
          accountId: req.user?.accountId,
          firstName: {
            contains: search ? String(search) : undefined,
            mode: 'insensitive',
          },
        },
        orderBy: {
          id: 'desc',
        },
      }),
    }
  }

  @Get('create')
  @Render('Contacts/Create')
  async create(@Req() req) {
    return {
      organizations: await this.organizationsService
        .findAll({
          select: {
            id: true,
            name: true,
          },
          where: {
            accountId: req.user?.accountId,
          },
          perPage: 200,
        })
        .then(({ data }) => data),
    }
  }

  @Post()
  @UsePipes(ValidationPipe)
  @Redirect('/contacts')
  @Flash({ message: 'Contact created.' })
  async store(@Req() req, @Body() data: CreateContactDto) {
    await this.contactsService.create({
      accountId: req.user?.accountId,
      ...data,
    })
  }

  @Get(':id')
  @Render('Contacts/Edit')
  async edit(@Req() req, @Param('id') id: string) {
    return {
      contact: await this.contactsService.findOne({
        where: {
          id: +id,
        },
      }),
      organizations: await this.organizationsService
        .findAll({
          select: {
            id: true,
            name: true,
          },
          where: {
            accountId: req.user?.accountId,
          },
          perPage: 200,
        })
        .then(({ data }) => data),
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @Redirect('back', 303)
  @Flash({ message: 'Contact updated.' })
  async update(@Param('id') id: string, @Body() data: UpdateContactDto) {
    await this.contactsService.update({
      data,
      where: {
        id: +id,
      },
    })
  }

  @Delete(':id')
  @Redirect('/contacts', 303)
  @Flash({ message: 'Contact deleted.' })
  destroy(@Param('id') id: string) {
    return this.contactsService.remove({
      id: +id,
    })
  }
}
