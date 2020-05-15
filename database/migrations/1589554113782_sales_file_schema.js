'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SalesFileSchema extends Schema {
  up() {
    this.create('sales_files', (table) => {
      table.increments();
      table
        .integer('sale_id')
        .unsigned()
        .references('id')
        .inTable('sales')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('sales_files');
  }
}

module.exports = SalesFileSchema;
