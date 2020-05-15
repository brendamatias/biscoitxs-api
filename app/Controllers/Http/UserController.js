'use strict';

const User = use('App/Models/User');

class UserController {
  async store({ request }) {
    const data = request.only([
      'name',
      'email',
      'password',
      'provider',
      'gender',
      'sexual_orientation',
    ]);

    const user = await User.create(data);

    return user;
  }
}

module.exports = UserController;
