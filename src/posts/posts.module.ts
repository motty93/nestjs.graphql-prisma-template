import { Module } from '@nestjs/common'
import { PrismaModule } from '~/prisma/prisma.module'
import { PostsService } from './posts.service'

@Module({
  imports: [PrismaModule],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
