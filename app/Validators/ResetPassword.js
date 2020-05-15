'use strict';

class ResetPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      token: 'required',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'token.required': 'O token é obrigatório.',
      'password.required': 'A senha é obrigatória.',
      'password.confirmed': 'A confirmação de senha é obrigatória.',
    };
  }
}

module.exports = ResetPassword;
