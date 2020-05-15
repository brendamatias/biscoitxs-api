'use strict';

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
    };
  }

  get messages() {
    return {
      'name.required': 'O nome é obrigatório',
      'email.required': 'O email é obrigatório',
      'email.email': 'Informe um email válido',
      'email.unique': 'Email já cadastrado.',
      'password.required': 'A senha é obrigatória',
      'password.confirmed': 'A confirmação de senha é obrigatória',
    };
  }
}

module.exports = User;
