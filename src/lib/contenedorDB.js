class Contenedor {
  constructor(options, tabla) {
    this.knex = require("knex")(options);
    this.tabla = tabla;
  }

  #handleError(error) {
    throw error;
  }

  async getAll() {
    try {
      return await this.knex(this.tabla);
    } catch (error) {
      this.#handleError(error);
    }
  }

  async getById(id) {
    try {
      return await this.knex(this.tabla).where({ id: id }).first();
    } catch (error) {
      this.#handleError(error);
    }
  }

  async save(objeto) {
    try {
      const [newID] = await this.knex(this.tabla).insert(objeto);
      return await this.getById(newID);
    } catch (error) {
      this.#handleError(error);
      return null;
    }
  }

  async saveById(objeto, id) {
    try {
      await this.knex(this.tabla).where({ id: id }).update(objeto);
      return await this.getById(id);
    } catch (error) {
      this.#handleError(error);
      return null;
    }
  }

  async deleteById(id) {
    try {
      const regs = await this.knex(this.tabla).where({ id: id }).del();
      return regs > 0 ? regs : null;
    } catch (error) {
      this.#handleError(error);
    }
  }

  async deleteAll() {
    try {
      return await this.knex(this.tabla).del();
    } catch (error) {
      this.#handleError(error);
    }
  }
}

module.exports = Contenedor;
