import { Test, TestingModule } from '@nestjs/testing'
import { PrismaModule } from '~/prisma/prisma.module'
import { AuthorsService } from './authors.service'

describe('AuthorsService', () => {
  let service: AuthorsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PrismaModule],
      providers: [AuthorsService],
    }).compile()

    service = module.get<AuthorsService>(AuthorsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
