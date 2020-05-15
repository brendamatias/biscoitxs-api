'use strict';

class ForgotPassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      email: 'required|email',
      redirect_url: 'required|url',
    };
  }

  get messages() {
    return {
      'email.required': 'O email é obrigatório.',
      'email.email': 'Informe um email válido.',
      'redirect_url.required': 'A url é obrigatória.',
      'redirect_url.url': 'Informe uma url válida.',
    };
  }
}

module.exports = ForgotPassword;
