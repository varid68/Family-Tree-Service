'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hirarki extends Model {
  static get table() {
    return 'hirarkis'
  }

  static get primaryKey() {
    return 'id'
  }
}

module.exports = Hirarki
