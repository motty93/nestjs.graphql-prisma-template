import { Injectable } from '@nestjs/common'
import { Author } from '@prisma/client'
import { PrismaService } from '~/prisma/prisma.service'

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findOneById(id: string): Promise<Author> {
    return await this.prisma.author.findUnique({ where: { id } })
  }
}
