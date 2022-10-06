import { Injectable } from '@nestjs/common'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(authorId: string) {
    return await this.prisma.post.findMany({
      where: { authorId },
    })
  }
}
