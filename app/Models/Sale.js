'use strict';

const Model = use('Model');

class Sale extends Model {
  user() {
    return this.belongsTo('App/Models/User');
  }

  address() {
    return this.belongsTo('App/Models/Address');
  }

  images() {
    return this.hasMany('App/Models/SalesFile');
  }
}

module.exports = Sale;
