import {
  Args,
  ID,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql'
import { PostDTO } from '~/posts/dto'
import { PostsService } from '~/posts/posts.service'
import { AuthorsService } from './authors.service'
import { AuthorDTO } from './dto'

@Resolver(() => AuthorDTO)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    private readonly postsService: PostsService,
  ) {}

  @Query(() => AuthorDTO)
  async author(@Args('id', { type: () => ID }) id: string) {
    return this.authorsService.findOneById(id)
  }

  @ResolveField(() => [PostDTO])
  async posts(@Parent() author: AuthorDTO) {
    const { id } = author

    return await this.postsService.findAll(id)
  }
}
