import { Test, TestingModule } from '@nestjs/testing'
import { PostsModule } from '~/posts/posts.module'
import { PrismaModule } from '~/prisma/prisma.module'
import { AuthorsResolver } from './authors.resolver'

describe('AuthorsResolver', () => {
  let resolver: AuthorsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule, PostsModule],
      providers: [AuthorsResolver],
    }).compile()

    resolver = module.get<AuthorsResolver>(AuthorsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
