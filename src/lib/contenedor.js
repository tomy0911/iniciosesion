const fs = require("fs");

const CODIFICATION = "utf-8";
const NUMERO_INICIAL = 1;

class Contenedor {
  constructor(nombreArchivo) {
    this.nombreArchivo = nombreArchivo;
  }

  #saveContenedor(contenedor = []) {
    const strContenedor = JSON.stringify(contenedor, null, 2);
    return fs.promises.writeFile(this.nombreArchivo, strContenedor);
  }

  #handleError(error) {
    throw error;
  }

  async getAll() {
    let contenedor = [];
    try {
      const data = await fs.promises.readFile(this.nombreArchivo, CODIFICATION);
      contenedor = JSON.parse(data);
    } catch (error) {
      await this.#saveContenedor().catch(this.#handleError);
    }
    return contenedor;
  }

  async getById(id) {
    const contenedor = await this.getAll();
    return contenedor.find((x) => x.id == id) ?? null;
  }

  async save(objeto) {
    try {
      const contenedor = await this.getAll();
      let nuevoId = NUMERO_INICIAL;
      if (contenedor.length > 0) {
        nuevoId = contenedor.reduce((a, b) => (a.id > b.id ? a : b)).id + 1;
      }
      objeto.id = nuevoId;
      contenedor.push(objeto);
      await this.#saveContenedor(contenedor);
      return objeto;
    } catch (error) {
      this.#handleError(error);
      return null;
    }
  }

  async saveById(objeto, id) {
    try {
      const contenedor = await this.getAll();
      const indiceObjeto = contenedor.findIndex((x) => x.id == id);
      if (indiceObjeto == -1) {
        return null;
      }
      objeto.id = id;
      contenedor[indiceObjeto] = objeto;
      await this.#saveContenedor(contenedor);
      return objeto;
    } catch (error) {
      this.#handleError(error);
      return null;
    }
  }

  async deleteById(id) {
    try {
      const contenedor = await this.getAll();
      const indiceObjeto = contenedor.findIndex((x) => x.id == id);
      if (indiceObjeto == -1) {
        return null;
      }
      const productoEliminado = contenedor[indiceObjeto];
      contenedor.splice(indiceObjeto, 1);
      await this.#saveContenedor(contenedor);
      return productoEliminado;
    } catch (error) {
      this.#handleError(error);
    }
  }

  async deleteAll() {
    try {
      await this.#saveContenedor();
    } catch (error) {
      this.#handleError(error);
    }
  }
}

module.exports = Contenedor;
