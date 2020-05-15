'use strict';

const Model = use('Model');

class Sale extends Model {
  addresses() {
    return this.belongsTo('App/Models/Address');
  }

  salesfiles() {
    return this.belongsToMany('App/Models/SalesFile');
  }
}

module.exports = Sale;
