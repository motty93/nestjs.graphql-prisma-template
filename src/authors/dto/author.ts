import { Field, ID, ObjectType } from '@nestjs/graphql'
import { PostDTO } from '../../posts/dto'

@ObjectType('Author')
export class AuthorDTO {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  firstName?: string

  @Field({ nullable: true })
  lastName?: string

  @Field(() => [PostDTO])
  posts: PostDTO[]
}
