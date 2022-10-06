import { Field, ID, Int, ObjectType } from '@nestjs/graphql'

@ObjectType('Post')
export class PostDTO {
  @Field(() => ID)
  id: string

  @Field()
  title: string

  @Field(() => Int, { nullable: true })
  votes?: number
}
