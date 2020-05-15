'use strict';

const Mail = use('Mail');
const Helpers = use('Helpers');

const User = use('App/Models/User');
const Sale = use('App/Models/Sale');
const Product = use('App/Models/Product');

const OrderHook = (exports = module.exports = {});

OrderHook.sendNewOrderMail = async (orderInstance) => {
  if (!orderInstance.user_id) return;

  const { rows } = await Product.query()
    .where('order_id', orderInstance.id)
    .with('sale')
    .fetch();

  const users = [];

  await Promise.all(
    rows.map(async (product) => {
      const sale = await Sale.find(product.sale_id);

      if (users.indexOf(sale.user_id)) {
        users.push(sale.user_id);
      }
    })
  );

  await Promise.all(
    users.map(async (id) => {
      const { name, email } = await User.find(id);

      await Mail.send(['emails.new_order'], { name, email }, (message) => {
        message
          .to(email)
          .from('hello@biscoitxs.com.br', 'Equipe Biscoitxs')
          .subject('Houve uma compra do seu produto');
      });
    })
  );
};
