'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class SalesSchema extends Schema {
  up() {
    this.create('sales', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('title').notNullable();
      table.string('category').notNullable();
      table.float('value').notNullable();
      table.string('description').notNullable();
      table.string('contact', 11);
      table.timestamps();
    });
  }

  down() {
    this.drop('sales');
  }
}

module.exports = SalesSchema;
