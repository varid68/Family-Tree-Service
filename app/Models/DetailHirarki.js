'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class DetailHirarki extends Model {
  static get table() {
    return 'detail_hirarkis'
  }

  static get primaryKey() {
    return 'id'
  }
}

module.exports = DetailHirarki
