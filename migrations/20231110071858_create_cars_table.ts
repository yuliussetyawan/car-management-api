import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.bigIncrements("id").primary();
    table.string("car_name", 50).notNullable();
    table.string("car_size", 50).notNullable();
    table.integer("car_rent_price", 20).notNullable();
    table.text("car_photo");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}

