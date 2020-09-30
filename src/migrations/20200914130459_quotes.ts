import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw('create extension if not exists "uuid-ossp"');
    await knex.schema.createTable('quotes', (builder: Knex.CreateTableBuilder) => {
        builder.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
        builder.string('customer_name').notNullable();
        builder.string('company_name').notNullable();
        builder.text('customer_email').notNullable();
        builder.bigInteger('quote_price').notNullable();
        builder.text('description').notNullable();
        builder.text('uploaded_path').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}

