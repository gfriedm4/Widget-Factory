<?php

namespace App\Http\Controllers;

use App\Order;
use App\Widget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Kyslik\ColumnSortable\Sortable;

class OrderController extends Controller
{
    use Sortable;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::query();

        $params = request()->all();
        $paramsKeys = array_keys($params);

        // Handle all searchable fields the same
        $searchableFields = ['id', 'name', 'address', 'email'];
        if (count($params)) {
            foreach ($paramsKeys as $paramKey) {
                if (in_array($paramKey, $searchableFields)) {
                    $value = $params[$paramKey];
                    if ($value) {
                        $orders->where($paramKey, 'LIKE', '%' . $value . '%');
                    }
                }
            }
        }

        $orders->with(['widgets' => function($query) {
            $query->select('widgets.id', 'widgets.name', 'order_widget.quantity');
        }]);

        return $orders->sortable(['updated_at', 'asc'])->paginate();
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

        $widgets = $request->get('widgets');
        $fails = false;

        // Validate inventory amount for each widget in the order
        if (!empty($widgets)) {
            foreach ($widgets as $widget_id => $widget) {
                $widgetModel = Widget::findOrFail($widget_id);
                if ($widgetModel->inventory < $widget['quantity']) {
                    return response([
                        'errors' => [
                            'widgets' => 'Not enough inventory for ' . $widgetModel->name . '.'
                        ]
                    ], 400);
                }
            }
        }
        else {
            return response([
                'errors' => [
                    'widgets' => 'Widgets should be an object { id: { quantity: x } }'
                ]
            ], 400);
        }


        if ($validate->fails() || $fails) {
            return response($validate->errors()->toJson(), 400);
        }

        $order->fill($request->all())->save();

        // Remove the inventory from each widget
        foreach ($widgets as $widget_id => $widget) {
            $widgetModel = Widget::findOrFail($widget_id);
            $widgetModel->inventory -= $widget['quantity'];
            $widgetModel->save();
        }

        $order->widgets()->sync($request->get('widgets'));

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

        $newWidgets = $request->get('widgets');

        $fails = false;

        if (empty($newWidgets) || !is_array($newWidgets)) {
            return response([
                'errors' => [
                    'widgets' => 'Widgets should be an object { id: { quantity: x } }'
                ]
            ], 400);
        }

        foreach (array_keys($newWidgets) as $newWidgetId) {
            $widget = Widget::findOrFail($newWidgetId);
            if (!$widget) {
                return response([
                    'errors' => [
                        'widgets' => 'Widgets does not exist: ' . $newWidgetId
                    ]
                ], 400);
            }
        }

        if ($validate->fails() || $fails) {
            return response($validate->errors()->toJson(), 400);
        }

        $widgetsToSave = [];

        // Ensure no quantities are going below 0 and save if they all pass
        foreach ($order->widgets as $currentWidget) {
            $currentOrderQuantity = $currentWidget->pivot->quantity;

            // In case where we need to update a quantity
            if (!empty($newWidgets[$currentWidget->id])) {
                $currentWidget->inventory += ($currentOrderQuantity - $newWidgets[$currentWidget->id]['quantity']);
            }

            if ($currentWidget->inventory < 0) {
                return response([
                    'errors' => [
                        'widgets' => 'Widget does not have enough inventory:' . $currentWidget->id
                    ]
                ], 400);
            }
            $widgetsToSave[] = $currentWidget;
        }

        foreach ($widgetsToSave as $widget) {
            $widget->save();
        }

        $order->widgets()->sync($newWidgets);

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
