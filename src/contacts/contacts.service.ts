import { Injectable } from '@nestjs/common'
import { Contact, Prisma } from '@prisma/client'
import { PaginatedResult } from 'prisma-pagination'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ContactCreateInput): Promise<Contact> {
    return this.prisma.contact.create({
      data,
    })
  }

  findAll(params?: {
    page?: number
    where?: Prisma.ContactWhereInput
    orderBy?: Prisma.ContactOrderByWithRelationAndSearchRelevanceInput
  }): Promise<PaginatedResult<Contact>> {
    const { page, where, orderBy } = params || {}

    return this.prisma.paginate<Contact, Prisma.ContactFindManyArgs>(
      this.prisma.contact,
      {
        where,
        orderBy,
      },
      { page },
    )
  }

  findOne(params: {
    where: Prisma.ContactWhereUniqueInput
    include?: Prisma.ContactInclude
  }): Promise<Contact | null> {
    return this.prisma.contact.findUnique(params)
  }

  update(params: {
    where: Prisma.ContactWhereUniqueInput
    data: Prisma.ContactUpdateInput
  }): Promise<Contact> {
    const { where, data } = params
    return this.prisma.contact.update({
      data,
      where,
    })
  }

  remove(where: Prisma.ContactWhereUniqueInput): Promise<Contact> {
    return this.prisma.contact.delete({
      where,
    })
  }
}
