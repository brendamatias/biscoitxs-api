'use strict';

const Antl = use('Antl');

class Order {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      status: 'required',
      products: 'required|array',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Order;
