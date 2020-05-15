'use strict';

const Sale = use('App/Models/Sale');

class SaleController {
  async index({ request }) {
    const { page } = request.get();

    const sales = await Sale.query().with('user').paginate(page);

    return sales;
  }

  async store({ request, auth }) {
    const data = request.only([
      'title',
      'category',
      'value',
      'description',
      'contact',
      'address_id',
    ]);

    const sale = await Sale.create({ ...data, user_id: auth.user.id });

    return sale;
  }

  async show({ params, response }) {
    try {
      const sale = await Sale.find(params.id);

      if (!sale) {
        return response.status(401).send({
          error: { message: 'Anúncio não encontrado.' },
        });
      }

      await sale.load('user');
      await sale.load('address');
      await sale.load('images');

      return sale;
    } catch (err) {
      return response.status(err.status).send({
        error: { message: 'Ops, erro interno.' },
      });
    }
  }

  async update({ params, request, response, auth }) {
    const sale = await Sale.findOrFail(params.id);

    if (sale.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Usuário não autorizado.' },
      });
    }

    const data = request.only([
      'title',
      'category',
      'value',
      'description',
      'contact',
      'address_id',
    ]);

    sale.merge(data);

    await sale.save();

    return sale;
  }

  async destroy({ params, response, auth }) {
    const sale = await Sale.findOrFail(params.id);

    if (sale.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Usuário não autorizado.' },
      });
    }

    await sale.delete();
  }
}

module.exports = SaleController;
