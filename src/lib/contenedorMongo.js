class Contenedor {
  constructor(model) {
    this.collection = model;
  }

  #handleError(error) {
    throw error;
  }

  async getAll() {
    try {
      const lista = await this.collection.find({}, { _id: 0, __v: 0 }).lean();
      return lista;
    } catch (error) {
      this.#handleError(error);
    }
  }

  async getById(id) {
    try {
      return await this.collection.findOne({ id: id }, { _id: 0, __v: 0 });
    } catch (error) {
      this.#handleError(error);
    }
  }

  async save(objeto) {
    try {
      const maxIdDoc = await this.collection
        .findOne({}, { id: 1 })
        .sort({ id: -1 })
        .limit(1);
      objeto.id = (maxIdDoc ? maxIdDoc.id : 0) + 1;
      await this.collection.create(objeto);
      return objeto;
    } catch (error) {
      this.#handleError(error);
      return null;
    }
  }

  async saveById(objeto, id) {
    try {
      const ret = await this.collection.findOneAndUpdate(
        { id: id },
        { $set: objeto },
        {
          new: true,
          projection: { _id: 0, __v: 0 },
        }
      );
      return ret;
    } catch (error) {
      this.#handleError(error);
      return null;
    }
  }

  async deleteById(id) {
    try {
      const ret = await this.collection.findOneAndDelete(
        { id: id },
        { projection: { _id: 0, __v: 0 } }
      );
      return ret;
    } catch (error) {
      this.#handleError(error);
    }
  }

  async deleteAll() {
    try {
      return await this.collection.deleteMany();
    } catch (error) {
      this.#handleError(error);
    }
  }
}

module.exports = Contenedor;
