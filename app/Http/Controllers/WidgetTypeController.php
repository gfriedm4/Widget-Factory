<?php

namespace App\Http\Controllers;

use App\WidgetType;
use Illuminate\Http\Request;

class WidgetTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return WidgetType::query()->pluck('type', 'id');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\WidgetType  $widgetType
     * @return \Illuminate\Http\Response
     */
    public function show(WidgetType $widgetType)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\WidgetType  $widgetType
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, WidgetType $widgetType)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\WidgetType  $widgetType
     * @return \Illuminate\Http\Response
     */
    public function destroy(WidgetType $widgetType)
    {

    }
}
