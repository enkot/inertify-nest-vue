import { Injectable } from '@nestjs/common'
import { compare } from 'bcryptjs'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne({
      where: {
        email,
      },
      include: {
        account: true,
      },
    })

    if (user && (await compare(pass, user.password))) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
