'use strict';

const Route = use('Route');

Route.post('users', 'UserController.store').validator('User');
Route.post('sessions', 'SessionController.store').validator('Session');

Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
);
Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
);

Route.get('files/:id', 'FileController.show');

Route.group(() => {
  Route.post('files', 'FileController.store');

  Route.resource('addresses', 'AddressController')
    .apiOnly()
    .validator(new Map([[['addresses.store'], ['Address']]]));

  Route.resource('sales', 'SaleController')
    .apiOnly()
    .validator(new Map([[['sales.store'], ['Sale']]]));

  Route.get('sales/:id/files', 'SalesFileController.show');
  Route.post('sales/:id/files', 'SalesFileController.store');
}).middleware(['auth']);
