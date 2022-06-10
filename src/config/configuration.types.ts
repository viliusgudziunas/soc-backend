import { ApolloDriverConfig } from '@nestjs/apollo';
import { IAuthModuleOptions } from '@nestjs/passport';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ExpressJwtOptions } from 'jwks-rsa';

export interface Auth0Config {
  algorithms: string[];
  audience: string;
  issuerUrl: string;
}

export interface Environment {
  auth0: Auth0Config;
  db: TypeOrmModuleOptions;
  graphql: ApolloDriverConfig;
  iAuth: IAuthModuleOptions;
  jwt: ExpressJwtOptions;
  mode: string;
  port: number;
}
