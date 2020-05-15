'use strict';

const Model = use('Model');

class SalesFile extends Model {
  sales() {
    return this.belongsTo('App/Models/Sale');
  }

  users() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = SalesFile;
