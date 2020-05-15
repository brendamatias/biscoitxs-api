'use strict';

const Antl = use('Antl');

class Address {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      address: 'required',
      neighborhood: 'required',
      number: 'required',
      state: 'required|min:2|max:2',
      city: 'required',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Address;
