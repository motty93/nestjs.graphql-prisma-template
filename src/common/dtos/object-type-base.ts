import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ObjectTypeBase {
  @Field(() => ID)
  id: string

  @Field({ nullable: true })
  sequentialId?: number

  @Field({ nullable: true })
  createdAt?: Date

  @Field({ nullable: true })
  updatedAt?: Date
}
