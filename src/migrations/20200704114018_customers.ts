import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('customers', (builder: Knex.CreateTableBuilder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'))
    builder.string('first_name', 25).notNullable();
    builder.string('last_name', 25);
    builder.string('email', 50).notNullable().unique();
    builder.boolean('email_verified').defaultTo(false);
    builder.dateTime('created_at').defaultTo(knex.fn.now());

  })
}


export async function down(knex: Knex): Promise<any> {
}

