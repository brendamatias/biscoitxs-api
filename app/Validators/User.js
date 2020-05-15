'use strict';

const Antl = use('Antl');
const AuthConfig = use('Config').get('auth');

class User {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required|confirmed',
      sexual_orientation: `in:${Object.keys(AuthConfig.sexual_orientation)}`,
      gender: `in:${Object.keys(AuthConfig.gender)}`,
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = User;
