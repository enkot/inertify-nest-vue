import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'
import * as faker from 'faker'

const prisma = new PrismaClient()

async function main() {
  const account = await prisma.account.upsert({
    where: { id: 1 },
    update: { name: 'Stark Industries' },
    create: {
      name: 'Stark Industries',
    },
  })

  await prisma.user.upsert({
    where: { email: 'tony@stark.com' },
    update: {},
    create: {
      accountId: account.id,
      firstName: 'Tony',
      lastName: 'Stark',
      email: 'tony@stark.com',
      owner: true,
      password: await hash('secret', 10),
    },
  })

  await Promise.all(
    Array.from({ length: 5 }).map(
      async () =>
        await prisma.user.create({
          data: {
            accountId: account.id,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            password: await hash('secret', 10),
          },
        })
    )
  )

  const organizations = await Promise.all(
    Array.from({ length: 100 }).map(
      async () =>
        await prisma.organization.create({
          data: {
            accountId: account.id,
            name: faker.company.companyName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            region: faker.address.state(),
            country: faker.address.country(),
            postalCode: faker.address.zipCode(),
          },
        })
    )
  )

  await Promise.all(
    Array.from({ length: 100 }).map(
      async () =>
        await prisma.contact.create({
          data: {
            accountId: account.id,
            organizationId: getRandomArrayItem(organizations).id,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
            address: faker.address.streetAddress(),
            city: faker.address.city(),
            region: faker.address.state(),
            country: faker.address.country(),
            postalCode: faker.address.zipCode(),
          },
        })
    )
  )
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

function getRandomArrayItem(items: any[]) {
  return items[Math.floor(Math.random() * items.length)]
}
