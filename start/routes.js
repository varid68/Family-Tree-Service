'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.get('students', 'StudentController.index')
  Route.get('students/:id', 'StudentController.show')
  Route.put('students/:id', 'StudentController.update')
  Route.post('students', 'StudentController.store')
  Route.delete('students/:id', 'StudentController.delete')
}).prefix('v1')
