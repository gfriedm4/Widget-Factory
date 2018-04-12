<?php

namespace App\Http\Controllers;

use App\Widget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WidgetController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $widgets = Widget::query()
            ->where('inventory', '>', 0)
            ->with(['widgetSize', 'widgetType', 'widgetFinish']);
        return $widgets->paginate();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $widget = new Widget;

        $validate = Validator::make($request->all(), $widget->getValidations());

        if ($validate->failed()) {
            return response($validate->errors()->toJson(), 400);
        }

        $widget->fill($request->all())->save();

        return response()->json($widget, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Widget  $widget
     * @return Widget
     */
    public function show(Widget $widget)
    {
        return $widget
            ->with(['widgetSize', 'widgetType', 'widgetFinish'])
            ->first();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Widget  $widget
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Widget $widget)
    {
        $validate = Validator::make($request->all(), $widget->getValidations());

        if ($validate->failed()) {
            return response($validate->errors()->toJson(), 400);
        }

        $widget->fill($request->all())->save();

        return response()->json($widget);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Widget  $widget
     * @return \Illuminate\Http\Response
     */
    public function destroy(Widget $widget)
    {
        $widget->delete();

        return response()->json(null, 204);
    }
}
