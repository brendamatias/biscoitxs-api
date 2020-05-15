'use strict';

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
    return {
      'title.required': 'O título é obrigatório.',
      'category.required': 'A categoria é obrigatória.',
      'value.required': 'O preço é obrigatório.',
      'description.required': 'A descrição é obrigatória.',
      'address_id.exists': 'Endereço não encontrado.',

      'contact.min': 'O contato deve conter no mínimo 10 caracteres.',
      'contact.max': 'O contato deve conter no máximo 11 caracteres.',
    };
  }
}

module.exports = Sale;
