import bcrypt from "bcrypt";
import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  const SALT = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync("super", SALT);

  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    { name: "yulius", email: "yulius@mail.com", password, role: "superadmin" },
  ]);
}
