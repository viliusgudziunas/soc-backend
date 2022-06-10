import { join } from 'path';
import { formatAppError } from 'src/app.errors';
import { Auth0Config, Environment } from './configuration.types';

const auth0: Auth0Config = {
  issuerUrl: process.env.AUTH0_ISSUER_URL,
  audience: process.env.AUTH0_AUDIENCE,
  algorithms: ['RS256'],
};

export default (): Environment => ({
  port: Number(process.env.PORT),
  mode: 'DEVELOPMENT',
  db: {
    type: 'postgres',

    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,

    entities: [join(__dirname, '**/*.entity.{ts,js}')],
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    cli: { migrationsDir: 'src/migration' },

    synchronize: true,
    autoLoadEntities: true,
    ssl: false,
    logging: false,
  },
  graphql: { autoSchemaFile: true, formatError: formatAppError },
  auth0,
  jwt: {
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${auth0.issuerUrl}.well-known/jwks.json`,
  },
  iAuth: { defaultStrategy: 'jwt' },
});
