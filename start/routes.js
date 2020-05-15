'use strict';

const Route = use('Route');

Route.post('users', 'UserController.store');
Route.post('sessions', 'SessionController.store');

Route.post('passwords', 'ForgotPasswordController.store');
Route.put('passwords', 'ForgotPasswordController.update');

Route.get('files/:id', 'FileController.show');

Route.group(() => {
  Route.post('files', 'FileController.store');

  Route.resource('addresses', 'AddressController').apiOnly();
  Route.resource('sales', 'SaleController').apiOnly();

  Route.get('sales/:id/files', 'SalesFileController.show');
  Route.post('sales/:id/files', 'SalesFileController.store');
}).middleware(['auth']);
