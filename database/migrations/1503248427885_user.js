'use strict';

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class UserSchema extends Schema {
  up() {
    this.create('users', (table) => {
      table.increments();
      table.string('name', 254).notNullable();
      table.string('email', 254).notNullable().unique();
      table.string('password', 254).notNullable();
      table.boolean('provider').defaultTo(false);
      table.string('gender');
      table.string('sexual_option');
      table.string('token');
      table.timestamp('token_created_at');
      table.timestamps();
    });
  }

  down() {
    this.drop('users');
  }
}

module.exports = UserSchema;
