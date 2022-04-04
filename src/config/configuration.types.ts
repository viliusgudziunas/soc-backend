import { ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export interface Environment {
  port: number;
  mode: string;
  db: TypeOrmModuleOptions;
  graphql: ApolloDriverConfig;
}
