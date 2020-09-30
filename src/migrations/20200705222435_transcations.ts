import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('transcations', (builder: Knex.CreateTableBuilder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    builder.uuid('customer_id').notNullable();
    builder.bigInteger('amount_recived').notNullable();
    builder.dateTime('created_at').defaultTo(knex.fn.now());

    builder.foreign('customer_id').references('customers.id');

  })
}


export async function down(knex: Knex): Promise<any> {
}

