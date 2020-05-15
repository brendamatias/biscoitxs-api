'use strict';

const Address = use('App/Models/Address');

class AddressController {
  async index({ auth }) {
    const addresses = await Address.query()
      .where('user_id', auth.user.id)
      .with('user')
      .fetch();

    return addresses;
  }

  async store({ request, auth }) {
    const data = request.only([
      'address',
      'neighborhood',
      'number',
      'state',
      'city',
    ]);

    const address = await Address.create({ ...data, user_id: auth.user.id });

    return address;
  }

  async show({ params }) {
    const address = await Address.findOrFail(params.id);

    return address;
  }

  async update({ params, request }) {
    const address = await Address.findOrFail(params.id);

    const data = request.only([
      'address',
      'neighborhood',
      'number',
      'state',
      'city',
    ]);

    address.merge(data);

    await address.save();

    return address;
  }

  async destroy({ params, response, auth }) {
    const address = await Address.findOrFail(params.id);

    if (address.user_id !== auth.user.id) {
      return response.status(401).send({
        error: { message: 'Usuário não autorizado.' },
      });
    }

    await address.delete();
  }
}

module.exports = AddressController;
