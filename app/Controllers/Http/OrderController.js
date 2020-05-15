'use strict';

const Order = use('App/Models/Order');
const Product = use('App/Models/Product');
const Sale = use('App/Models/Sale');

class OrderController {
  async index({ request, auth }) {
    const { page } = request.get();

    const orders = await Order.query()
      .where('user_id', auth.user.id)
      .with('products')
      .paginate(page);

    return orders;
  }

  async store({ request, response, auth }) {
    const { status, products } = request.only(['status', 'products']);
    let total = 0;

    const order = await Order.create({ user_id: auth.user.id, total, status });

    await Promise.all(
      products.map(async (product) => {
        const sale = await Sale.find(product.sale_id);

        if (!sale) {
          return response.status(404).send({
            error: { message: 'Produto não encontrado.' },
          });
        }

        product.value = sale.value * product.quantity;

        total += product.value;

        await Product.create({
          order_id: order.id,
          sale_id: sale.id,
          quantity: product.quantity,
          unitary_value: sale.value,
          total: product.value,
        });
      })
    );

    order.merge({ total });

    await order.save();

    return order;
  }

  async show({ params, response, auth }) {
    const order = await Order.findOrFail(params.id);

    if (order.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Usuário não autorizado.' },
      });
    }

    await order.load('user');
    await order.load('products');

    return order;
  }
}

module.exports = OrderController;
