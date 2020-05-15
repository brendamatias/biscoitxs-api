'use strict';

class Session {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'O email é obrigatório.',
      'email.email': 'Informe um email válido.',
      'password.required': 'A senha é obrigatória.',
    };
  }
}
module.exports = Session;
