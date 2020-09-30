import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await knex.schema.createTable('payments', (builder: Knex.CreateTableBuilder) => {
    builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    builder.uuid('customer_id').notNullable().unique();
    builder.bigInteger('total_amount').defaultTo(0);
    builder.bigInteger('recived_amount').defaultTo(0);
    builder.date('due_date');
    builder.dateTime('created_at').defaultTo(knex.fn.now());

  });
}


export async function down(knex: Knex): Promise<any> {
}

