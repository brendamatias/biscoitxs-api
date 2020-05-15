'use strict';

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
    return {
      'address.required': 'O endereço é obrigatório.',
      'neighborhood.required': 'O bairro é obrigatório.',
      'number.required': 'O número é obrigatório.',
      'state.required': 'O estado é obrigatório.',
      'city.required': 'A cidade é obrigatório.',

      'state.min': 'O estado deve conter no mínimo 2 caracteres.',
      'state.max': 'O estado deve conter no máximo 2 caracteres.',
    };
  }
}

module.exports = Address;
