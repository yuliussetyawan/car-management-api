import knex from "knex";

const knexInstance = knex({
  client: "postgresql",
  connection: {
    database: "cars_db",
    user: "postgres",
    password: "yulius",
  },
});

export default knexInstance;