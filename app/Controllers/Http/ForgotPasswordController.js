'use strict';

const crypto = require('crypto');

const User = use('App/Models/User');
const Mail = use('Mail');

class ForgotPasswordController {
  async store({ request, response }) {
    try {
      const email = request.input('email');
      const user = await User.findByOrFail('email', email);

      user.token = crypto.randomBytes(10).toString('hex');
      user.token_created_at = new Date();

      await user.save();

      await Mail.send(
        ['emails.forgot_password'],
        {
          email,
          token: user.token,
          link: `${request.input('redirect_url')}?token=${user.token}`,
        },
        (message) => {
          message
            .to(user.email)
            .from('hello@biscoitxs.com.br', 'Equipe Biscoitxs')
            .subject('Recuperação de senha');
        }
      );
    } catch (err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Email não encontrado' } });
    }
  }
}

module.exports = ForgotPasswordController;
