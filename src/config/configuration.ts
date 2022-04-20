import { join } from 'path';
import { formatAppError } from 'src/app.errors';
import { Environment } from './configuration.types';

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
  },
  graphql: {
    autoSchemaFile: true,
    formatError: formatAppError,
  },
});
