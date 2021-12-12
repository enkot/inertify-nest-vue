import {
  Get,
  Post,
  Req,
  Redirect,
  Controller,
  UseGuards,
  UseFilters,
} from '@nestjs/common'
import { Render } from '@inertify/nest'
import { LoginGuard } from './guards/login.guard'
import { LoginExceptionFilter } from '../common/filters/login-exceptions.filter'

@Controller('auth')
export class AuthController {
  @Get('/login')
  @Render('Auth/Login')
  async getLogin() {}

  @UseGuards(LoginGuard)
  @Post('/login')
  @UseFilters(LoginExceptionFilter)
  @Redirect('/')
  async login() {}

  @Get('/logout')
  @Redirect('/auth/login')
  logout(@Req() req) {
    req.logout()
  }
}
