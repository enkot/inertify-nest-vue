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
  ForbiddenException,
  UseInterceptors,
  UploadedFile,
  ConflictException,
  UsePipes,
} from '@nestjs/common'
import { Render, Flash } from '@inertify/nest'
import { FileInterceptor } from '@nestjs/platform-express'
import { AuthGuard } from '../auth/guards/auth.guard'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ValidationPipe } from '../common/pipes/validation.pipe'
import { diskStorageConfig } from '../common/configs/multer.config'

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Render('Users/Index')
  async index(@Req() req, @Query('page') page, @Query('search') search) {
    return {
      filters: {
        search,
      },
      users: await this.usersService.findAll({
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
  @Render('Users/Create')
  create() {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(FileInterceptor('photo', diskStorageConfig))
  @Redirect('/users')
  @Flash({ message: 'User created.' })
  async store(
    @Req() req,
    @Body() data: CreateUserDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    try {
      await this.usersService.create({
        account: {
          connect: {
            id: req.user?.accountId,
          },
        },
        ...data,
        photo: photo?.filename,
      })
    } catch (exception) {
      if (exception.code === 'P2002')
        throw new ConflictException(
          `A new user cannot be created with these fields: ${exception.meta.target.join(
            ',',
          )}`,
        )

      throw exception
    }
  }

  @Get(':id')
  @Render('Users/Edit')
  async edit(@Param('id') id: string) {
    return {
      user: await this.usersService.findOne({
        where: {
          id: +id,
        },
      }),
    }
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  @Redirect('back', 303)
  @Flash({ message: 'User updated.' })
  async update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    if (data?.email === 'tony@stark.com')
      throw new ForbiddenException('Updating the demo user is not allowed.')

    await this.usersService.update({
      data,
      where: {
        id: +id,
      },
    })
  }

  @Delete(':id')
  @Redirect('/users', 303)
  @Flash({ message: 'User deleted.' })
  async destroy(@Param('id') id: string) {
    const user = await this.usersService.findOne({
      where: {
        id: +id,
      },
    })

    if (user?.email === 'tony@stark.com')
      throw new ForbiddenException('Deleting the demo user is not allowed.')

    return this.usersService.remove({
      id: +id,
    })
  }
}
