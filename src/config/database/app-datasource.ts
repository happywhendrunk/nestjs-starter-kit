import { DataSource } from 'typeorm';
import { connectionOptions } from './db';

const appDataSource = new DataSource({
  ...connectionOptions,
  entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migration.{js,ts}'],
});

export default appDataSource;
