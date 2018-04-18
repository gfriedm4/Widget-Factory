<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('widgets/all', function() {
    return \App\Widget::all()->pluck('name', 'id');
});

/*
 * GET	    /resource_name	                index	orders.index
 * GET	    /orders/create	        create	orders.create
 * POST	    /orders	                store	orders.store
 * GET	    /orders/{order}	        show	orders.show
 * GET	    /orders/{order}/edit	edit	orders.edit
 * PUT	    /orders/{order}	        update	orders.update
 * DELETE	/orders/{order}	        destroy	orders.destroy
 */
Route::apiResources([
    'orders' => 'OrderController',
    'widgets' => 'WidgetController',
    'types' => 'WidgetTypeController',
    'sizes' => 'WidgetSizeController',
    'finishes' => 'WidgetFinishController'
]);