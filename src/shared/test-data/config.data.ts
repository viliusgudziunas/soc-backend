import { Environment } from 'src/config/configuration.types';

export const config: Environment = {
  auth0: {
    audience: 'test auth0 audience',
    issuerUrl: 'test auth0 issuerUrl',
    algorithms: ['test auth0 algorithms'],
  },
  db: {},
  graphql: {},
  iAuth: {},
  jwt: { jwksUri: 'test jwksUri' },
  mode: 'test mode',
  port: 1,
};

export const validatePayload: unknown = {
  sub: 'test sub',
  name: 'test name',
  email: 'test email',
  picture: 'test picture',
};
