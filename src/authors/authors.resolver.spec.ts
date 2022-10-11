import { Test, TestingModule } from '@nestjs/testing'
import { Author } from '@prisma/client'
import { PostsModule } from '~/posts/posts.module'
import { PrismaModule } from '~/prisma/prisma.module'
import { PrismaService } from '~/prisma/prisma.service'
import { AuthorsResolver } from './authors.resolver'

describe('AuthorsResolver', () => {
  let resolver: AuthorsResolver
  let prisma: PrismaService
  let author: Author

  async function createData() {
    author = await prisma.author.create({
      data: {
        firstName: 'test',
        lastName: 'taro',
      },
    })
    await prisma.post.create({
      data: {
        title: 'test post',
        votes: 1,
        author: { connect: { id: author.id } },
      },
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, PostsModule],
      providers: [AuthorsResolver],
    }).compile()

    resolver = module.get<AuthorsResolver>(AuthorsResolver)
    prisma = module.get<PrismaService>(PrismaService)

    // 初期化
    await prisma.cleanupDatabase()
    // 初期データ
    await createData()
  })

  describe('author', () => {
    it('success', async () => {
      const ret = await resolver.author(author.id)

      expect(ret.firstName).toBe(author.firstName)
      expect(ret.lastName).toBe(author.lastName)
      expect(ret.posts)
    })
  })
})
