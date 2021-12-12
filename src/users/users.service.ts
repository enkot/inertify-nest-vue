import { Injectable } from '@nestjs/common'
import { User, Prisma } from '@prisma/client'
import { PaginatedResult } from 'prisma-pagination'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    })
  }

  findAll(params?: {
    page?: number
    where?: Prisma.UserWhereInput
    orderBy?: Prisma.UserOrderByWithRelationAndSearchRelevanceInput
  }): Promise<PaginatedResult<User>> {
    const { page, where, orderBy } = params || {}

    return this.prisma.paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.user,
      {
        where,
        orderBy,
      },
      { page },
    )
  }

  findOne(params: {
    where: Prisma.UserWhereUniqueInput
    include?: Prisma.UserInclude
  }): Promise<User | null> {
    return this.prisma.user.findUnique(params)
  }

  update(params: {
    where: Prisma.UserWhereUniqueInput
    data: Prisma.UserUpdateInput
  }): Promise<User> {
    const { where, data } = params
    return this.prisma.user.update({
      data,
      where,
    })
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    })
  }
}
