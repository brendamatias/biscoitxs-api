'use strict';

const Model = use('Model');

class Order extends Model {
  static boot() {
    super.boot();

    this.addHook('afterSave', 'OrderHook.sendNewOrderMail');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }

  products() {
    return this.hasMany('App/Models/Product');
  }
}

module.exports = Order;
