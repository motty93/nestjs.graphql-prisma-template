import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  const author = await prisma.author.create({
    data: {
      firstName: 'test',
      lastName: 'taro',
    },
  })

  console.info({ author })
}

main()
  .catch(async (e) => {
    console.error(e)
    console.error('author seed error')
    await prisma.author.deleteMany({})
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
