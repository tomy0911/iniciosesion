const conn = require("./lib/connections.js");

async function main() {
  const mariaDB = require("knex")(conn.mariaDb);
  const sqlite = require("knex")(conn.sqlite);

  await mariaDB.schema
    .createTable("productos", (table) => {
      table.increments("id");
      table.string("title");
      table.float("price");
      table.string("thumbnail");
    })
    .then(() => console.log("Tabla de Productos Creada correctamente!"))
    .catch((err) => {
      console.log("Error al crear tabla de Productos");
      console.log(err);
    })
    .finally(() => {
      mariaDB.destroy();
    });

  await sqlite.schema
    .createTable("mensajes", (table) => {
      table.increments("id");
      table.string("mail");
      table.string("mensaje");
      table.timestamp("fecha");
    })
    .then(() => console.log("Tabla de Mensajes Creada correctamente!"))
    .catch((err) => {
      console.log("Error al crear tabla");
      console.log(err);
    })
    .finally(() => {
      sqlite.destroy();
    });
}

main();
