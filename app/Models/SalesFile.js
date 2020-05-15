'use strict';

const Model = use('Model');

class SalesFile extends Model {
  sale() {
    return this.belongsTo('App/Models/Sale');
  }

  file() {
    return this.belongsTo('App/Models/File');
  }
}

module.exports = SalesFile;
