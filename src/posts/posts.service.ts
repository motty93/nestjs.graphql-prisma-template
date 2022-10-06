import { Injectable } from '@nestjs/common'
import { Post } from '@prisma/client'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(authorId: string): Promise<Post[]> {
    return await this.prisma.post.findMany({
      where: { authorId },
    })
  }
}
