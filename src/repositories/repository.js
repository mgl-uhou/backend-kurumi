"use strict";

class Repository {
  constructor(model) {
    this.model = model;
  }

  create = async (data) => {
    return await this.model.create(data);
  };

  update = async (id, data) => {
    return await this.model.update(data, { where: { id } });
  };

  delete = async (id) => {
    return await this.model.destroy({ where: { id } });
  };

  /**
   * 
   * @param {number} id Valor do atributo identificador.
   * @param {string} attributes Array dos atributos que serão retornado 
   * @returns Objeto de resposta do banco.
   */
  findById = async (id, attributes) => {
    return await this.model.findByPk(id, { attributes });
  };
}

module.exports = Repository;
