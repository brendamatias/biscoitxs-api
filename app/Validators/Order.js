'use strict';

const Antl = use('Antl');
const OrderConfig = use('Config').get('order');

class Order {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      status: `required|in:${Object.keys(OrderConfig.status)}`,
      products: 'required|array',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Order;
