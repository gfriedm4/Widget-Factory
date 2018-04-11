<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

/*
 * GET	    /widgets	            index	widgets.index
 * GET	    /widgets/create	        create	widgets.create
 * POST	    /widgets	            store	widgets.store
 * GET	    /widgets/{widget}	    show	widgets.show
 * GET	    /widgets/{widget}/edit	edit	widgets.edit
 * PUT	    /widgets/{widget}	    update	widgets.update
 * DELETE	/widgets/{widget}	    destroy	widgets.destroy
 */
Route::resource('widgets', 'WidgetController');