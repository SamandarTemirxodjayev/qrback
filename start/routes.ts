
import Route from '@ioc:Adonis/Core/Route'

Route.group(() =>{
  Route.resource('/catalogs', "CatalogsController").apiOnly()
  Route.resource('/menus', "MenusController").apiOnly()
  Route.resource('/banners', "BannersController").apiOnly()
  Route.post('/payments', "PaymentsController.getToken")
  Route.post('/payments/pay', "PaymentsController.pay")
  Route.post('/payments/pay/:id', "PaymentsController.otp")
}).prefix('/api')
