<?php

namespace App\Http\Controllers;

use App\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::query()
            ->with(['widgets' => function($query) {
                $query->select('widgets.id', 'widgets.name');
            }]);
        return $orders->paginate();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $order = new Order;

        $validate = Validator::make($request->all(), $order->getValidations());

        if ($validate->failed()) {
            return response($validate->errors()->toJson(), 400);
        }

        $order->fill($request->all())->save();

        return response()->json($order, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Order  $order
     * @return Order|\Illuminate\Http\Response
     */
    public function show(Order $order)
    {
        return $order->with(['widgets' => function($query) {
            $query->select('widgets.id', 'widgets.name');
        }])->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  Order  $order
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Order $order)
    {
        $validate = Validator::make($request->all(), $order->getValidations());

        if ($validate->failed()) {
            return response($validate->errors()->toJson(), 400);
        }

        $order->fill($request->all())->save();

        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Order  $order
     * @return \Illuminate\Http\Response
     */
    public function destroy(Order $order)
    {
        $order->delete();

        return response()->json(null, 204);
    }
}
