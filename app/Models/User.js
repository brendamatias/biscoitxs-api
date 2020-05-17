'use strict';

const Hash = use('Hash');
const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', async (userInstance) => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password);
      }
    });
  }

  static get hidden() {
    return ['password', 'updated_at'];
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }

  sales() {
    return this.hasMany('App/Models/Sales');
  }

  addresses() {
    return this.hasMany('App/Models/Address');
  }
}

module.exports = User;
