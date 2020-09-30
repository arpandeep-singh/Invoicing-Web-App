import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('invoices', (builder: Knex.CreateTableBuilder) => {
    builder.increments('id').primary();
    builder.uuid('customer_id').notNullable();
    builder.text('file').notNullable();
    builder.dateTime('created_at').defaultTo(knex.fn.now());

    builder.foreign('customer_id').references('customers.id');
  });
}


export async function down(knex: Knex): Promise<any> {
}

