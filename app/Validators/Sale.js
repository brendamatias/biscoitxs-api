'use strict';

const Antl = use('Antl');

class Sale {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      title: 'required',
      category: 'required',
      value: 'required',
      description: 'required',
      address_id: 'exists:addresses,id',
      contact: 'min:10|max:11',
    };
  }

  get messages() {
    return Antl.list('validation');
  }
}

module.exports = Sale;
