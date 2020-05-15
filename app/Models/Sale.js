'use strict';

const Model = use('Model');

class Sale extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  address() {
    return this.belongsTo('App/Models/Address');
  }

  salesfiles() {
    return this.belongsToMany('App/Models/SalesFile');
  }
}

module.exports = Sale;
