import { Injectable } from '@nestjs/common'
import { Organization, Prisma } from '@prisma/client'
import { PaginatedResult } from 'prisma-pagination'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class OrganizationsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.OrganizationCreateInput): Promise<Organization> {
    return this.prisma.organization.create({
      data,
    })
  }

  findAll(params?: {
    page?: number
    perPage?: number
    where?: Prisma.OrganizationWhereInput
    select?: Prisma.OrganizationSelect
    orderBy?: Prisma.OrganizationOrderByWithRelationAndSearchRelevanceInput
  }): Promise<PaginatedResult<Organization>> {
    const { page, perPage, select, where, orderBy } = params || {}

    return this.prisma.paginate<Organization, Prisma.OrganizationFindManyArgs>(
      this.prisma.organization,
      {
        select,
        where,
        orderBy,
      },
      { page, perPage },
    )
  }

  findOne(params: {
    where: Prisma.OrganizationWhereUniqueInput
    include?: Prisma.OrganizationInclude
  }): Promise<Organization | null> {
    return this.prisma.organization.findUnique(params)
  }

  update(params: {
    where: Prisma.OrganizationWhereUniqueInput
    data: Prisma.OrganizationUpdateInput
  }): Promise<Organization> {
    const { where, data } = params
    return this.prisma.organization.update({
      data,
      where,
    })
  }

  remove(where: Prisma.OrganizationWhereUniqueInput): Promise<Organization> {
    return this.prisma.organization.delete({
      where,
    })
  }
}
