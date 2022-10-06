import { Field, ObjectType, Query, Resolver } from '@nestjs/graphql'

@ObjectType()
export class PongPayload {
  @Field(() => String)
  status: string
}

@Resolver()
export class AppResolver {
  @Query(() => PongPayload)
  async ping() {
    return { status: 'pong' }
  }
}
