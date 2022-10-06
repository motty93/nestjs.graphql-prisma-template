import { Module } from '@nestjs/common'
import { PostsModule } from '~/posts/posts.module'
import { PrismaModule } from '~/prisma/prisma.module'
import { AuthorsResolver } from './authors.resolver'
import { AuthorsService } from './authors.service'

@Module({
  imports: [PostsModule, PrismaModule],
  providers: [AuthorsResolver, AuthorsService],
})
export class AuthorsModule {}
