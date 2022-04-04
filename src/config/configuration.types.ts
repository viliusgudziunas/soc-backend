import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export interface Environment {
  port: number;
  mode: string;
  db: TypeOrmModuleOptions;
}
