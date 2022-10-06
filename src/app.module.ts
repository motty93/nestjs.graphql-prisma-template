import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      debug: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      cache: 'bounded',
      sortSchema: true,
      cors: {
        origin: process.env.ORIGIN_URL,
        credentials: true,
      },
      context: ({ req, res }) => ({ req, res }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
