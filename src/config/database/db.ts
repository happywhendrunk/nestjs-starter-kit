import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from '@/config/env';
// connectionOptions is exported separately because we are using it in two places.

//WHY TWO EXPORTS IF IT CAN BE IN THE SAME PLACE ?
/**
 * connectionOptions tells the technique required by nestjs application required to connect to the database..
 * It is read by the Nestjs application when the application starts.
 * But the server doesn't completely start or never starts during the migration or test cases.
 * For that we create a new DataSource object which is a standalone object which is not dependent on the Nestjs application.
 * If you see on the app-datasource.ts file you will see that connectionOptions is imported there and used to create a new DataSource object.
 * This is because the DataSource object is used to create the database tables and run migrations.
 */

// why are we using "as const" in the end ?
// because it treats the object as immutable or readonly and the value of type is "postgres" , not string .
// if we don't add the const the type of type is string but it's value can be anything and we don't want that.

export const connectionOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,
  synchronize: false,
} as const;

export default {
  ...connectionOptions,
  //if we don't use autoLoadEntities then we have to add each entity in the entities array.
  //   entities: [__dirname + '/**/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/*.migration.{js,ts}'],
  // autoLoadEntities load all the entities on startup so that its not necessary to add each entity
  autoLoadEntities: true,
} as TypeOrmModuleOptions;

/**
 * TypeOrmModuleOption is a package provided by Nestjs which tells us how my database connects to my database.
 * It tells NestJS how to manage the TypeORM connection within its module system.
 * TypeOrmModuleOption extends DataSourceOption .
 * DataSourceOption comes directly from the typeorm package itself.
 * DataSourceOption defines the fundamental technical properties required to connect to a database.
 */
