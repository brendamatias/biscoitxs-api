'use strict';

const Mail = use('Mail');

class NewOrderMail {
  static get concurrency() {
    return 1;
  }

  static get key() {
    return 'NewOrderMail-job';
  }

  async handle({ name, email }) {
    console.log(`Job: ${NewOrderMail.key}`);

    await Mail.send(['emails.new_order'], { name, email }, (message) => {
      message
        .to(email)
        .from('hello@biscoitxs.com.br', 'Equipe Biscoitxs')
        .subject('Houve uma compra do seu produto');
    });
  }
}

module.exports = NewOrderMail;
