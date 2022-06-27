import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GqlModuleAsyncOptions, GraphQLModule } from '@nestjs/graphql';
import {
  TypeOrmModule,
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChallengesModule } from './challenges/challenges.module';
import configuration from './config/configuration';
import { EntityNotFoundErrorFilter } from './exception-filters/entity-not-found-error.filter';
import { QueryFailedErrorFilter } from './exception-filters/query-failed-error.filter';
import { ExercisesModule } from './exercises/exercises.module';
import { GroupsModule } from './groups/groups.module';

const getTypeOrmOptions = (): TypeOrmModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (config: ConfigService): TypeOrmModuleOptions => config.get('db'),
  inject: [ConfigService],
});

const getGqlOptions = (): GqlModuleAsyncOptions => ({
  driver: ApolloDriver,
  imports: [ConfigModule],
  useFactory: (config: ConfigService): ApolloDriverConfig =>
    config.get('graphql'),
  inject: [ConfigService],
});

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration] }),
    TypeOrmModule.forRootAsync(getTypeOrmOptions()),
    GraphQLModule.forRootAsync(getGqlOptions()),

    AuthModule,
    ChallengesModule,
    ExercisesModule,
    GroupsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,

    { provide: APP_FILTER, useClass: EntityNotFoundErrorFilter },
    { provide: APP_FILTER, useClass: QueryFailedErrorFilter },
  ],
})
export class AppModule {}
