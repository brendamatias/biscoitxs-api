'use strict';

const Model = use('Model');

class Product extends Model {
  sale() {
    return this.belongsTo('App/Models/Sale');
  }
}

module.exports = Product;
