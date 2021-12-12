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
} from '@nestjs/common'
import { Render, Flash } from '@inertify/nest'
import { AuthGuard } from '../auth/guards/auth.guard'
import { OrganizationsService } from './organizations.service'
import { CreateOrganizationDto } from './dto/create-organization.dto'
import { UpdateOrganizationDto } from './dto/update-organization.dto'
import { ValidationPipe } from '../common/pipes/validation.pipe'
import { UsePipes } from '@nestjs/common'

@Controller('organizations')
@UseGuards(AuthGuard)
export class OrganizationsController {
  constructor(private readonly organizationsService: OrganizationsService) {}

  @Get()
  @Render('Organizations/Index')
  async index(@Req() req, @Query('page') page, @Query('search') search) {
    return {
      filters: {
        search,
      },
      organizations: await this.organizationsService.findAll({
        page,
        where: {
          accountId: req.user?.accountId,
          name: {
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
  @Render('Organizations/Create')
  create() {}

  @Post()
  @UsePipes(ValidationPipe)
  @Redirect('/organizations')
  @Flash({ message: 'Organization created.' })
  async store(@Req() req, @Body() data: CreateOrganizationDto) {
    await this.organizationsService.create({
      accountId: req.user?.accountId,
      ...data,
    })
  }

  @Get(':id')
  @Render('Organizations/Edit')
  async edit(@Param('id') id: string) {
    return {
      organization: await this.organizationsService.findOne({
        where: {
          id: +id,
        },
        include: {
          contacts: true,
        },
      }),
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @Redirect('back', 303)
  @Flash({ message: 'Organization updated.' })
  async update(@Param('id') id: string, @Body() data: UpdateOrganizationDto) {
    await this.organizationsService.update({
      data,
      where: {
        id: +id,
      },
    })
  }

  @Delete(':id')
  @Redirect('/organizations', 303)
  @Flash({ message: 'Organization deleted.' })
  destroy(@Param('id') id: string) {
    return this.organizationsService.remove({
      id: +id,
    })
  }
}
