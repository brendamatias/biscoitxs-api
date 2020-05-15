'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class AddressSchema extends Schema {
  up() {
    this.create('addresses', (table) => {
      table.increments();
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable();
      table.string('address').notNullable();
      table.string('neighborhood').notNullable();
      table.string('number').notNullable();
      table.string('state', 2).notNullable();
      table.string('city').notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop('addresses');
  }
}

module.exports = AddressSchema;
