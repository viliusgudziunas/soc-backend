export default () => ({
  port: Number(process.env.PORT),
  mode: 'DEVELOPMENT',
  db: {
    type: 'postgres',

    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,

    entities: ['**/*.entity{.ts,.js}'],
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    cli: { migrationsDir: 'src/migration' },

    ssl: false,
  },
});
