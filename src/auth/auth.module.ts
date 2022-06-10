import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  AuthModuleAsyncOptions,
  IAuthModuleOptions,
  PassportModule,
} from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

const getAuthOptions = (): AuthModuleAsyncOptions => ({
  imports: [ConfigModule],
  useFactory: (config: ConfigService) =>
    config.get<IAuthModuleOptions>('iAuth'),
  inject: [ConfigService],
});

@Module({
  controllers: [AuthController],
  imports: [ConfigModule, PassportModule.registerAsync(getAuthOptions())],
  providers: [JwtStrategy],
})
export class AuthModule {}
