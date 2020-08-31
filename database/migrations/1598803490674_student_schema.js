'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class StudentSchema extends Schema {
  up() {
    this.create('students', (table) => {
      table.increments()
      table.string('nisn').nullable()
      table.string('name').nullable()
      table.string('study').nullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('students')
  }
}

module.exports = StudentSchema
