const conn = require("./lib/connections.js");

async function main() {
  const mariaDB = require("knex")(conn.mariaDb);
  const sqlite = require("knex")(conn.sqlite);

  await mariaDB.schema.dropTableIfExists("productos").catch((err) => {
    console.log("Error al dropear tabla de Productos");
    console.log(err);
  });

  await sqlite.schema.dropTableIfExists("mensajes").catch((err) => {
    console.log("Error al dropear tabla de Mensajes");
    console.log(err);
  });

  mariaDB.destroy();
  sqlite.destroy();
}

main();
