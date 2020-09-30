import Knex from 'knex';
import { knexSnakeCaseMappers } from 'objection';


export const knexConfig = {
  development: {
    client: "pg",
    connection: 'postgres://localhost/ks_builder',
    ...knexSnakeCaseMappers()
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    ...knexSnakeCaseMappers()
  }
}

const isDevelopment = process.env.NODE_ENV !== 'production';

const knex = isDevelopment ? Knex(knexConfig.development) : Knex(knexConfig.production);

export default knex;