import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthModuleAsyncOptions,
  IAuthModuleOptions,
  PassportModule,
} from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const getAuthOptions = (): AuthModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (config: ConfigService): IAuthModuleOptions =>
    config.get('iAuth'),
  inject: [ConfigService],
});

@Module({
  imports: [ConfigModule, PassportModule.registerAsync(getAuthOptions())],
  providers: [JwtStrategy],
})
export class AuthModule {}
