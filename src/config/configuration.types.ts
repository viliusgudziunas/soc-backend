export interface DbCli {
  migrationsDir: string;
}

export interface DbConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  migrationsTableName: string;
  migrations: string[];
  cli: DbCli;
  ssl: boolean;
}

export interface Environment {
  port: number;
  mode: string;
  db: DbConfig;
}
