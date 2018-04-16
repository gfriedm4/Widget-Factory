<?php

namespace App\Http\Controllers;

use App\Widget;
use App\WidgetFinish;
use App\WidgetSize;
use App\WidgetType;
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
            ->where('inventory', '>', 0);

        // Implement filtering logic by size, type, and finish
        // Implement search logic by name
        $params = request()->all();
        $paramsKeys = array_keys($params);
        if (count($params)) {
            if (in_array('widgetSize', $paramsKeys)) {
                $size = $params['widgetSize'];
                if ($size && is_numeric($size) && WidgetSize::findOrFail($size)) {
                    $widgets->whereHas('widgetSize', function ($query) use ($size) {
                        $query->where('id', '=', $size);
                    });
                }
            }

            if (in_array('widgetType', $paramsKeys)) {
                $type = $params['widgetType'];
                if ($type && is_numeric($type) && WidgetType::findOrFail($type)) {
                    $widgets->whereHas('widgetType', function ($query) use ($type) {
                        $query->where('id', '=', $type);
                    });
                }
            }

            if (in_array('widgetFinish', $paramsKeys)) {
                $finish = $params['widgetFinish'];
                if ($finish && is_numeric($finish) && WidgetFinish::findOrFail($finish)) {
                    $widgets->whereHas('widgetFinish', function ($query) use ($finish) {
                        $query->where('id', '=', $finish);
                    });
                }
            }

            if (in_array('name', $paramsKeys)) {
                $name = $params['name'];
                if ($name) {
                    $widgets->where('name', 'LIKE', '%' . $name . '%');
                }
            }
        }

        $widgets->with(['widgetSize', 'widgetType', 'widgetFinish']);
        return $widgets->sortable(['name'])->paginate();
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
