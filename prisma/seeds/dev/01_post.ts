import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const main = async () => {
  const author = await prisma.author.findUnique({
    where: { sequentialId: 1 },
  })
  console.log(author.id)
  const post = await prisma.post.create({
    data: {
      title: 'test post',
      votes: 1,
      author: { connect: { id: author.id } },
    },
  })

  console.info({ post })
}

main()
  .catch(async (e) => {
    console.error(e)
    console.error('post seed error')
    await prisma.post.deleteMany({})
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
