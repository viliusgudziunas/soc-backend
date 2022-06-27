import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as jwksRsa from 'jwks-rsa';
import { ExtractJwt } from 'passport-jwt';
import { configData as data } from 'src/shared/test-data';
import { configMocks as mocks } from 'src/shared/test-mocks';
import { JwtStrategy } from '../jwt.strategy';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;
  let configService: ConfigService;

  let passportJwtSecretSpy: jest.SpyInstance;
  let fromAuthHeaderAsBearerTokenSpy: jest.SpyInstance;

  beforeEach(async () => {
    passportJwtSecretSpy = jest.spyOn(jwksRsa, 'passportJwtSecret');
    fromAuthHeaderAsBearerTokenSpy = jest.spyOn(
      ExtractJwt,
      'fromAuthHeaderAsBearerToken',
    );

    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        { provide: ConfigService, useValue: mocks.configServiceMock },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  describe('constructor', () => {
    it('should get configuration from config service', () => {
      expect(configService.get).toBeCalledTimes(4);
      expect(configService.get).toBeCalledWith('jwt');
      expect(configService.get).toBeCalledWith('auth0.audience');
      expect(configService.get).toBeCalledWith('auth0.issuerUrl');
      expect(configService.get).toBeCalledWith('auth0.algorithms');
    });

    it('should create passport JWT secret with JWT config', () => {
      expect(passportJwtSecretSpy).toBeCalledTimes(1);
      expect(passportJwtSecretSpy).toBeCalledWith(configService.get('jwt'));
    });

    it('should call a function to setup passport for bearer tokens', () => {
      expect(fromAuthHeaderAsBearerTokenSpy).toBeCalledTimes(1);
      expect(fromAuthHeaderAsBearerTokenSpy).toBeCalledWith();
    });
  });

  describe('.validate()', () => {
    it('should return the same payload as it was provided', async () => {
      const result = await strategy.validate(data.validatePayload);

      expect(result).toEqual(data.validatePayload);
    });
  });
});
